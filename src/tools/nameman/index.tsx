import { For, Show, createMemo, createResource, createSignal, onMount } from "solid-js"
import { Button, ButtonGroup, GroupSeparator, Input, Label } from "../../components/elements/atoms"
import { styled } from "solid-styled-components"
import { theme } from "../../theme"
import { capitalize } from "../../lib/text"
import { icons } from "../../components/icons"
import { CopyButton } from "../../components/elements/atoms/copyButton"
import { RangeInput } from "../../components/elements/range"

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
  // Restrict length of words to take from wordlist
  restrictLength: boolean,
  // Wordlist
  wordList: string[]
): string[] => {
  if (!wordList.length) {
    return ["Loading..."]
  }
  const filteredWordList = restrictLength ? wordList.filter(word => word.length <= maxLengthAllowed) : wordList
  const names: string[] = Array(count).fill(0).map(() => {
    const name = Array(sections).fill(0).map(() => {
      const word = capitalize(filteredWordList[Math.floor(Math.random() * filteredWordList.length)])
      if (word.length > maxLengthAllowed) {
        return word.slice(0, maxLengthAllowed)
      }
      return word
    }).join('')
    return name
  })

  return [...names]
}

const [wordList] = createResource(fetchWordList)

const [wordConfig, setWordConfig] = createSignal({
  count: 60,
  sections: 2,
  maxLengthAllowed: 6,
  restrictLength: false,
  seed: 0
})

type WordConfig = ReturnType<typeof wordConfig>
const changeConfig = (keyname: 'count' | 'sections' | 'maxLengthAllowed', value: string) => {
  const intVal = parseInt(value)
  if (isNaN(intVal)) {
    return
  }
  if (intVal < 1) {
    value = '1'
  }
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
const clearFavWords = () => {
  setFavWords([])
  localStorage.removeItem(favWordsCacheName)
}

const [showFavWords, setShowFavWords] = createSignal(false)


const names = createMemo(() => {
  if (wordList.loading) {
    return ["Loading..."]
  }
  if (!wordList()) {
    return ["Error: No wordlist"]
  }

  return generateNames(
    wordConfig().count,
    wordConfig().sections,
    wordConfig().maxLengthAllowed,
    wordConfig().restrictLength,
    wordList()!
  )
})

const Row = styled('div')`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`

const Toolbar = styled('div')`
  display: flex;
  gap: 1rem 2rem;
  padding: 1rem;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: flex-end;
  width: 100%;
  border-radius: calc(2 * ${theme.border.radius});


  & > ${Row.class} {
    flex: 1;
    align-items: flex-end;
  }
  & label {
    max-width: 16ch;
  }

  & label:has(input[type="checkbox"]) {
    display: flex;
    flex-direction: row-reverse;
    width: max-content;
    max-width: max-content;
    justify-content: flex-end;
    input {
      width: 1rem;
      min-width: 1rem;
      max-width: 1rem;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    & > ${Row.class} {
      flex: 1;
      justify-content: center;
    }
  }
`

const Names = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  max-width: 100%;
`

const NameWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0rem 0.25rem 0rem 1rem;
  background: ${theme.surface};
  border-radius: calc(2 * ${theme.border.radius}) 2rem 2rem calc(2 * ${theme.border.radius});
  font-size: var(--fontSize, ${theme.font.size.base});
  width: calc(var(--maxWordLength) + 6rem);
  max-width: 100%;
  word-break: break-all;
  outline: 2px solid transparent;
  transition: outline 0.25s ease-in-out;

  &.active .name-div {
    color: ${theme.primary.color};
  }

  &:hover {
    outline: 2px solid ${theme.primary.color};
  }

  .name-div {
    transition: all 0.25s ease-in-out;
    flex: 1;
    padding: 0.25rem 0;
  }

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
  padding: 0.5rem;
  min-height: max-content;
  background: transparent;
  border: none;
  color: ${theme.fadeText};
  border-radius: 50%;

  &.active {
    color: ${theme.primary.color};
  }
  
  iconify-icon {
    font-size: ${theme.font.size.base};
  }
`

const Name = (props: { name: string, icon?: string }) => {
  const { name } = props
  return (
    <NameWrapper onClick={(e) => {
      console.log(e)
      if (e.target instanceof HTMLDivElement && e.target.classList.contains('name-div')) {
        toggleFavWord(name)
      }
    }}
      classList={{ active: favWords().includes(name) }}
    >
      <div class="name-div">{name}</div>
      <FavButton
        title={favWords().includes(name) ? 'Remove from favorites' : 'Add to favorites'}
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
`

const FavActions = styled(ButtonGroup)`
  margin: 0 auto;
  width: max-content;
  & button {
    width: max-content;
    max-width: 100%;
  }
`

const WordList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
`

export const Nameman = (props: { defaultConfig?: WordConfig }) => {
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
    if (props.defaultConfig) {
      setWordConfig(props.defaultConfig)
    }
  })

  return (
    <Wrapper>

      <Show when={favWords().length > 0}>
        <Show when={showFavWords()}>
          <Toolbar class="theme-card">
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
              <GroupSeparator />

              <Button
                onClick={clearFavWords}>
                <iconify-icon icon={icons.delete}></iconify-icon>
                Clear
              </Button>
            </FavActions>

          </Toolbar>
        </Show>
      </Show>

      <Show when={wordList.loading}>Loading...</Show>
      <Show when={wordList.error}>Error: {wordList.error.message}</Show>

      <Toolbar class="theme-card">
        <Row>
          <Button onClick={() => setWordConfig({ ...wordConfig(), seed: wordConfig().seed + 1 })}>
            <iconify-icon icon={icons.shuffle}></iconify-icon>
            Regenerate
          </Button>

          <Show when={wordList()}>
            <WordList>
              <Label title="Restrict length of words to take from wordlist">
                Word Length
                <Input
                  type="checkbox"
                  checked={wordConfig().restrictLength}
                  onInput={() => setWordConfig({ ...wordConfig(), restrictLength: !wordConfig().restrictLength, seed: wordConfig().seed + 1 })}
                />
              </Label>
            </WordList>
          </Show>

          <RangeInput
            label="Names"
            showValue
            value={wordConfig().count}
            onChange={e => changeConfig('count', e.currentTarget.value)}
            min={8}
            max={100}
            step={1}
          />

          <RangeInput
            label="Words to join"
            showValue
            value={wordConfig().sections}
            onChange={e => changeConfig('sections', e.currentTarget.value)}
            min={1}
            max={5}
            step={1}
          />


          <RangeInput
            // label={wordConfig().restrictLength ? `Max length of words to take from wordlist` : `Cut the word taken from wordlist to Slice Length`}
            label={wordConfig().restrictLength ? `Max Length` : `Slice Length`}
            showValue
            value={wordConfig().maxLengthAllowed}
            onChange={e => changeConfig('maxLengthAllowed', e.currentTarget.value)}
            min={1}
            max={12}
            step={1}
          />
        </Row>


        <Show when={favWords().length > 0}>
          <Button
            classList={{ selected: showFavWords() }}
            onClick={() => setShowFavWords(!showFavWords())}>
            <iconify-icon
              width="1.5rem"
              height="1.5rem"
              icon={icons.favAnim}></iconify-icon>
            {favWords().length} favs
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
      <div> <a href={word_list_url} target="_blank" rel="noreferrer">List</a>: {wordList()!.length} words </div>
    </Wrapper>
  )
}
