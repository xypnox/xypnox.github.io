import { For, Show, createMemo, createResource, createSignal, onMount } from "solid-js"
import { Button, ButtonGroup, GroupSeparator, Input, Label } from "../../components/elements/atoms"
import { styled } from "solid-styled-components"
import { theme } from "../../theme"
import { capitalize } from "../../lib/text"
import { icons } from "../../components/icons"
import { CopyButton } from "../../components/elements/atoms/copyButton"

const word_list_url = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt'
const wordListCacheName = 'nameman-wordList'
const favWordsCacheName = 'nameman-favWords'

const fetchWordList = async (): Promise<string[]> => {
  const wordListCache = localStorage.getItem(wordListCacheName)
  if (wordListCache) {
    return wordListCache.split('\n').slice(0, -1)
  }
  const response = await fetch(word_list_url)
  const text = await response.text()
  localStorage.setItem(wordListCacheName, text)
  return text.split('\n').slice(0, -1)
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

const [favWords, setFavWords] = createSignal<string[]>([])
const addFavWord = (word: string) => {
  setFavWords([...favWords(), word])
  localStorage.setItem(favWordsCacheName, favWords().join(','))
}
const toggleFavWord = (word: string) => {
  if (favWords().includes(word)) {
    removeFavWord(word)
  } else {
    addFavWord(word)
  }
}
const removeFavWord = (word: string) => {
  const newFavWords = favWords().filter(w => w !== word)
  setFavWords(newFavWords)
  if (newFavWords.length === 0) {
    setShowFavWords(false)
  }
  localStorage.setItem(favWordsCacheName, favWords().join(','))
}

const [showFavWords, setShowFavWords] = createSignal(false)


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
  justify-content: space-between;
  width: 100%;
  & > div {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
  }
  & label {
    max-width: 16ch;
  }
  & button {
    height: max-content;
  }
`

const Names = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`

const NameWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.66rem 1rem;
  background: ${theme.surface};
  border-radius: calc(2 * ${theme.border.radius});
  font-size: var(--fontSize, ${theme.font.size.base});
  width: calc(var(--maxWordLength) + 4rem);
  max-width: 100%;

  @media (max-width: 600px) {
    width: 100%;
  }

  button {
    opacity: 0.5;
  }

  button.active {
    opacity: 1;
  }

  &:hover button {
    opacity: 1;
  }
`

const FavButton = styled(Button)`
  padding: 0.25rem;
  min-height: max-content;
  background: transparent;
  border: none;
  color: ${theme.fadeText};

  &.active {
    color: ${theme.primary.color};
  }
  
  iconify-icon {
    font-size: ${theme.font.size.sm};
  }
`

const Name = (props: { name: string, icon?: string }) => {
  const { name } = props
  return (
    <NameWrapper>
      {name}
      <FavButton class="small"
        classList={{ active: favWords().includes(name) }}
        onClick={() => toggleFavWord(name)}>
        <iconify-icon icon={props.icon ?? 'ph:star-duotone'}></iconify-icon>
      </FavButton>
    </NameWrapper >
  )
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: ${theme.surface};
  border-radius: calc(4 * ${theme.border.radius});
  padding: 1rem 1rem;
`

const FavActions = styled(ButtonGroup)`
  margin: 0 auto;
  width: max-content;
  gap: 1px;
  & button {
    width: max-content;
    max-width: 100%;
  }
`

export const Nameman = () => {
  // createEffect(() => {
  //   console.log('wordConfig', wordConfig())
  //   console.log('names', names())
  //   console.log('wordList', wordList())
  // })

  onMount(() => {
    // Load favWords from localStorage
    const favWordsCache = localStorage.getItem(favWordsCacheName)
    if (favWordsCache) {
      setFavWords(favWordsCache.split(','))
    }
  })

  return (
    <Wrapper class="theme-card">

      <Show when={favWords().length > 0}>
        <Show when={showFavWords()}>
          <>
            <Names
              style={{
                '--maxWordLength': (favWords().reduce((max, name) => name.length > max ? name.length : max, 0)) + 'ch',
                '--fontSize': wordConfig().maxLengthAllowed > 8 ? theme.font.size.base : `calc(${theme.font.size.base} * 1.5)`
              }}
            >
              <For each={favWords()}>{name => <Name
                icon={icons.delete}
                name={name} />}</For>

            </Names>
            <FavActions>
              <CopyButton
                icon={icons.copy}
                label="Copy Favorites" copyText={() => favWords().join('\n')} />
              {/* List is made as markdown - */}
              <GroupSeparator />
              <CopyButton
                icon={icons.copy}
                label="Copy as - List" copyText={() => favWords().map(w => `- ${w}`).join('\n')} />
            </FavActions>
          </>
        </Show>
      </Show>

      <Show when={wordList.loading}>Loading...</Show>
      <Show when={wordList.error}>Error: {wordList.error.message}</Show>

      <Toolbar>
        <div>
          <Show when={wordList()}>
            <div><p>Loaded: {wordList()!.length} words</p>
              <a href={word_list_url} target="_blank" rel="noreferrer">Source</a>
            </div>
          </Show>
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
            <iconify-icon icon={icons.shuffle}></iconify-icon>
            Regenerate</Button>
        </div>
        <Show when={favWords().length > 0}>
          <Button
            classList={{ selected: showFavWords() }}
            onClick={() => setShowFavWords(!showFavWords())}>
            <iconify-icon icon={icons.favAnim}></iconify-icon>
            Favourites
          </Button>
        </Show>

      </Toolbar>

      <Names
        style={{
          '--maxWordLength': (names().reduce((max, name) => name.length > max ? name.length : max, 0)) + 'ch',
          '--fontSize': wordConfig().maxLengthAllowed > 8 ? theme.font.size.base : `calc(${theme.font.size.base} * 1.5)`
        }}
      >
        <For each={names()}>{name => <Name name={name} />}</For>
      </Names>
    </Wrapper>
  )
}
