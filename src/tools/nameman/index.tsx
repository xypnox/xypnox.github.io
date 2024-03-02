import { For, Show, createEffect, createMemo, createResource, createSignal } from "solid-js"
import { Button, Input, Label } from "../../components/elements/atoms"
import { styled } from "solid-styled-components"
import { theme } from "../../theme"
import { capitalize } from "../../lib/text"

const word_list_url = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt'
const wordListCacheName = 'nameman-wordList'

const fetchWordList = async (): Promise<string[]> => {
  const wordListCache = localStorage.getItem(wordListCacheName)
  if (wordListCache) {
    return wordListCache.split('\n')
  }
  const response = await fetch(word_list_url)
  const text = await response.text()
  localStorage.setItem(wordListCacheName, text)
  return text.split('\n')
}

const generateNames = (
  // Number of names to generate
  count: number,
  // Number of words to join from wordlist
  sections: number,
  // Max length of words to take from wordlist
  maxLengthAllowed: number,
  // Wordlist
  wordList: string[]
): string[] => {
  if (!wordList.length) {
    return ["Loading..."]
  }
  const names: string[] = Array(count).fill(0).map(() => {
    const name = Array(sections).fill(0).map(() => {
      const word = wordList[Math.floor(Math.random() * wordList.length)]
      return capitalize(word.length > maxLengthAllowed ? word.slice(0, maxLengthAllowed) : word)
    }).join('')
    return name
  })

  return [...names]
}

const [wordList] = createResource(fetchWordList)

const [wordConfig, setWordConfig] = createSignal({
  count: 100,
  sections: 2,
  maxLengthAllowed: 6,
  seed: 0
})

const changeConfig = (keyname: 'count' | 'sections' | 'maxLengthAllowed', value: string) => {
  setWordConfig({ ...wordConfig(), [keyname]: parseInt(value), seed: wordConfig().seed + 1 })
}

const names = createMemo(() => {
  if (wordList.loading) {
    return ["Loading..."]
  }
  if (!wordList()) {
    return ["Error: No wordlist"]
  }

  return generateNames(wordConfig().count, wordConfig().sections, wordConfig().maxLengthAllowed, wordList()!)
})

const Toolbar = styled('div')`
  display: flex;
  gap: 1rem 2rem;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  width: max-content;
  max-width: 100%;
  & > label {
    max-width: 13ch;
  }
  & button {
    height: max-content;
  }
`

const Names = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`

const Name = styled('div')`
  padding: 1rem;
  background: ${theme.surface};
  border-radius: calc(2 * ${theme.border.radius});
  font-size: ${theme.font.size.md};
  width: var(--maxWordLength);
`

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: ${theme.surface};
  padding: 1rem;
`

export const Nameman = () => {
  // createEffect(() => {
  //   console.log('wordConfig', wordConfig())
  //   console.log('names', names())
  // })
  return (
    <Wrapper class="theme-card">
      <Show when={wordList.loading}>Loading...</Show>
      <Show when={wordList.error}>Error: {wordList.error.message}</Show>

      <Show when={wordList()}>
        <div><p>Words Loaded: {wordList()!.length} | <a href={word_list_url} target="_blank" rel="noreferrer">Source</a>
        </p></div>
      </Show>
      <Toolbar>
        <Label>
          Total Generated
          <Input type="number" value={wordConfig().count} onInput={e => changeConfig('count', e.currentTarget.value)} />
        </Label>
        <Label>
          Words joined
          <Input type="number" value={wordConfig().sections} onInput={e => changeConfig('sections', e.currentTarget.value)} />
        </Label>
        <Label>
          Max Length
          <Input type="number" value={wordConfig().maxLengthAllowed} onInput={e => changeConfig('maxLengthAllowed', e.currentTarget.value)} />
        </Label>
        <Button onClick={() => setWordConfig({ ...wordConfig(), seed: wordConfig().seed + 1 })}>
          <iconify-icon icon="mdi:refresh" />
          Regenerate</Button>
      </Toolbar>

      <Names
        style={{
          '--maxWordLength': (names().reduce((max, name) => name.length > max ? name.length : max, 0) + 2) + 'ch'
        }}
      >
        <For each={names()}>{name => <Name>{name}</Name>}</For>
      </Names>
    </Wrapper>
  )
}
