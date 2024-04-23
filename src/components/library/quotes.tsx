import { For, createSignal } from "solid-js"
import { styled } from "solid-styled-components"
import { Masonry } from "../grids/masonry"
import { theme } from "../../theme"
import { Button } from "../elements/atoms"
import { icons } from "../icons"

interface Quote {
  quote: string
  author?: string
}

const sanitizeQuote = (quote: Quote) => {
  return {
    quote: quote.quote.trim(),
    author: quote.author?.trim()
  }
}

const quotes: Quote[] = [
  {
    quote: "It doesn't matter if a cat is black or white, so long as it catches mice.",
  },
  {
    quote: "Anything that can be said in a few words, isn't worth saying and should be forgotten",
    author: "Alex Bell",
  },
  {
    quote: "Art should comfort the disturbed and disturb the comfortable.",
    author: "Banksy",
  },
  {
    quote: "The true measure of humor is the amount of truth it contains.",
    author: "random youtube comment"
  },
  {
    quote: "I didn't have time to write a short letter, so I wrote a long one instead.",
    author: "Mark Twain"
  },
  {
    quote: "We do not write in order to be understood; we write in order to understand.",
    author: "C. S. Lewis"
  },
  {
    quote: "When there's a will to fail, obstacles can be found.",
    author: "John McCarthy"
  },
  {
    quote: `"When I use a word," Humpty-Dumpty said, "it means just what I choose it to mean -- neither more nor less."`,
    author: "Lewis Carroll"
  },
  {
    quote: "There is no such thing as a new idea. It is impossible. We simply take a lot of old ideas and put them into a sort of mental kaleidoscope.",
    author: "Mark Twain"
  },
  {
    quote: "Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them.",
    author: "Frank Herbert"
  },
  {
    quote: "For every complex problem there is an answer that is clear, simple, and wrong.",
    author: "H. L. Mencken"
  },
  {
    quote: "When a measure becomes a target, it ceases to be a good measure.",
    author: "Charles Goodhart"
  },
  {
    quote: `When nothing seems to help, I go and look at a stonecutter hammering away at his rock, perhaps a hundred times without as much as a crack showing in it. Yet at the hundred and first blow it will split in two, and I know it was not that last blow that did it—but all that had gone before.`,
    author: "Jacob A. Riis"
  },
  {
    quote: "There's no such thing as bad weather, only unsuitable clothing.",
    author: "Alfred Wainwright"
  },
  {
    quote: `"For all of those who say 'blockchain will solve X, the only thing it solves is you now know the person knows nothing about X."`,
    author: "Nicholas Weaver"
  },
  {
    quote: "Notes aren’t a record of my thinking process. They are my thinking process.",
    author: "Richard Feynman"
  },
  {
    quote: `They did not know it was impossible, so they did it.`,
    author: "Mark Twain"
  },
  {
    quote: `In a little while you will be alone in shoreless space, to wander its limitless solitudes without friend or comrade forever - for you will remain a thought, the only existent thought, and by your nature inextinguishable, indestructible.`,
    author: "Mark Twain"
  },
  {
    quote: "There is no future. There is no past. Time is simultaneous, an intricately structured jewel that humans insist on viewing one edge at a time, when the whole design is visible in every facet.",
    author: "Alan Moore"
  },
  {
    quote: "The trouble is that we have a bad habit, encouraged by pedants and sophisticates, of considering happiness as something rather stupid.",
    author: "Ursula K. Le Guin"
  },
  {
    quote: `There's no free will, says the philosopher; To hang is most unjust.
There is no free will, assents the officer; We hang because we must.`,
    author: "Ambrose Bierce"
  },
  {
    quote: `In anything at all, perfection is finally attained not when there is no longer anything to add, but when there is no longer anything to take away, when a body has been stripped down to its nakedness.`,
    author: "Antoine de St. Exupery"
  },
  {
    quote: `Every block of stone has a statue inside it and it is the task of the sculptor to discover it. I saw the angel in the marble and carved until I set him free.`,
    author: "Michelangelo"
  },
  {
    quote: `Mystery exists in the mind, not in reality.
Confusion exists in the map, not in the territory.`,
    author: "E.T. Jaynes"
  },
  {
    quote: "Live to the point of tears.",
    author: "Albert Camus"
  },
  {
    quote: `Among my most prized possessions are the words that I have never spoken.`,
    author: "Orson Scott Card"
  },
  {
    quote: `The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.`,
    author: "Friedrich Nietzsche"
  },
  {
    quote: `Simple things should be simple; complex things should be possible.`,
    author: "Alan Kay"
  },
  {
    quote: "Principles are higher than techniques. Principles produce techniques in an instant.",
    author: "Ido Portal"
  },
  {
    quote: `It’s a shame that the only thing a man can do for eight hours a day is work. He can’t eat for eight hours; he can’t drink for eight hours; he can’t make love for eight hours. The only thing a man can do for eight hours is work.`,
    author: "William Faulkner"
  },
  {
    quote: "In spite of everything I shall rise again: I will take up my pencil, which I have forsaken in my great discouragement, and I will go on with my drawing.",
    author: "Vincent Van Gogh"
  },
  {
    quote: "Many a false step was made by standing still.",
    author: "Fortune Cookie"
  },
  {
    quote: "The only reason it sounds deep is because he’s buried it under a layer of garbage",
    author: "Jreg"
  },
  {
    quote: "You defeated me But you won't defeat me again Because you have grown all you can grow.. But I am still growing.",
    author: "Edmund Hillary (about Mount Everest)"
  },
  {
    quote: "Either seem as you are, Or be as you seem.",
    author: "Rumi"
  },
  {
    quote: "Vision without action is daydream. Action without vision is nightmare.",
    author: "Japanese Proverb"
  },
  {
    quote: "Money talks, wealth whispers.",
  },
  {
    quote: "Don't walk behind me; I may not lead. Don't walk in front of me; I may not follow. Just walk beside me and be my friend.",
  },
  {
    quote: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
    author: "Albert Camus"
  },
  {
    quote: "“You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life.",
    author: "Albert Camus"
  },
  {
    quote: "You know what charm is: a way of getting the answer yes without having asked any clear question.",
    author: "Albert Camus"
  },
  {
    quote: "To decide whether life is worth living is to answer the fundamental question of philosophy",
    author: "Albert Camus"
  },
  {
    quote: "I imagine one of the reasons people cling to their hates so stubbornly is because they sense, once hate is gone, they will be forced to deal with pain.",
    author: "James Baldwin"
  },
  {
    quote: "Success is liking yourself, liking what you do, and liking how you do it.",
    author: "Maya Angelou"
  },
  {
    quote: "Where there is ruin, there is hope for a treasure.",
    author: "Rumi"
  },
  {
    quote: "Home is where the books are.",
    author: "Richard Francis Burton"
  },
  {
    quote: "The trouble with being punctual is that nobody’s there to appreciate it.",
    author: "Franklin P. Jones"
  },
  {
    quote: "A foolish man tells a woman to stop talking, but a wise man tells her that her mouth is extremely beautiful when her lips are closed.",
    author: "Anonymous"
  },
  {
    quote: "The early bird may get the worm, but the second mouse gets the cheese.",
    author: "Anonymous"
  },
  {
    quote: "War doesn’t determine who’s right. War determines who’s left.",
    author: "Anonymous"
  },
  {
    quote: "If a soul is left in the darkness, sins will be committed. The guilty one is not he who commits the sin but he who causes the darkness.",
    author: "Victor Hugo"
  },
  {
    quote: "The mirror is my Best Friend, because when i cry, it never laughs.",
    author: "Charles Chaplin"
  },
  {
    quote: "Perhaps one did not want to be loved so much as to be understood.",
    author: "George Orwell, 1984"
  },
  {
    quote: "The tennis ball doesn't know how old I am. The ball doesn't know if I'm a man or a woman or if I come from a communist country or not. Sport has always broken down these barriers.",
    author: "Martina Navratilova"
  },
  {
    quote: "Even if you’re on the right track, you’ll get run over if you just sit there.",
    author: "Will Rogers"
  },
  {
    quote: "Borders are for animals who can't distinguish their own species from their own species.",
  },
  {
    quote: "Plant your own garden and decorate your own soul, instead of waiting for someone to bring you flowers.",
    author: "Veronica A. Shoffstall"
  },
  {
    quote: "Birds born in a cage think flying is an illness.",
    author: "Alejandro Jodorowsky"
  },
  {
    quote: "Remember that characters always, for good or for evil, get what they need. They do not get what they want.",
    author: "Neil Gaiman"
  },
  {
    quote: "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.",
    author: "Neil Gaiman, Coraline"
  },
  {
    quote: "And that's the thing about people who mean everything they say. They think everyone else does too.",
    author: "Khaled Hosseini"
  },
  {
    quote: "The child who is not embraced by the village will burn it down to feel it's warmth.",
    author: "African Proverb"
  },
  {
    quote: "“I wish it need not have happened in my time” , said Frodo. “So do I” , said Gandalf, “and so do all who live to see such times. But that is not for them to decide. All we have to decide is what to do with the time that is given us.” ",
    author: "J.R.R. Tolkien"
  },
  {
    quote: "If you think you're leading and no one is following you, then you're only taking a walk.",
    author: "Afghan Proverb"
  },
  {
    quote: "The man who passes the sentence should swing the sword.",
  },
  {
    quote: "When I was 5 years old, my mother always told me that happiness was the key to life. When I went to school, they asked me what I wanted to be when I grew up. I wrote down \"happy.\" They told me I didn't understand the assignment, and I told them they didn't understand life.",
    author: "Anonymous"
  },
  {
    quote: "You can’t reason someone out of a position that they didn’t reason themselves into.",
  },
  {
    quote: "A man convinced against his will is of the same opinion still.",
  },
  {
    quote: "Nothing is perfect, Everything can be improved but not every change is an improvement.",
  },
  {
    quote: "I don't mind your thinking slowly; I mind your speaking faster than you think.",
    author: "Wolfgang Pauli"
  },
  {
    quote: "The universe prefers the improbable to prevent the impossible.",
  },
  {
    quote: "A beautiful thing is never perfect.",
  },
  {
    quote: "The greatest trick the devil ever pulled was convincing the world he didn't exist.",
    author: "The Usual Suspects"
  },
  {
    quote: "One day a researcher is doing an experiment with frogs. He cuts one of the frog's legs off. He ordered the frog to jump, and it did. Then he cut off one of the frog's arms off. He then ordered the frog to jump again, and it did as it was told. He continued to do this until he had cut all of the frog's appendages off. He then ordered the frog to jump, and the frog couldn't. The rescearcher then wrote in his notes: when I cut all of a frog's legs off it becomes deaf.",
  },
  {
    quote: "The word \"reality\" is also a word, a word which we must learn to use correctly.",
    author: "Bohr"
  },
  {
    quote: "An expert is a man who has made all the mistakes which can be made in a very narrow field.",
    author: "Bohr"
  },
  {
    quote: "Politicians use statistics in the same way that a drunk uses lamp-posts; for support rather than illumination.",
    author: "Andrew Lang"
  },
  {
    quote: "By the time a man realizes that maybe his father was right, he usually has a son who thinks he’s wrong.",
    author: "Charles Wadsworth"
  },
  {
    quote: "I must say to myself that I ruined myself, and that nobody great or small can be ruined except by his own hand.",
    author: "Oscar Wilde, De Profundis"
  },
  {
    quote: "The first principle is that you must not fool yourself and you are the easiest person to fool.",
    author: "Feynman"
  },
  {
    quote: "The opportunity of defeat lies in our own hands. but the opportunity of defeating the enemy is provided by the enemy himself",
    author: "Sun Tzu"
  },
  {
    quote: "Judge of a man his questions, not his answers.",
    author: "Voltaire"
  },
  {
    quote: "Believe nothing, no matter where you read it, or who said it, no matter if I have said it, unless it agrees with your own reason and your own common sense.",
    author: "Buddha"
  },
  // {
  //   quote: "",
  //   author: ""
  // },
  // {
  //   quote: "",
  //   author: ""
  // },
  // {
  //   quote: "",
  //   author: ""
  // },
  // {
  //   quote: "",
  //   author: ""
  // },
].map(sanitizeQuote);



const MasonryItem = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: ${theme.font.size.lg};
  background: ${theme.surface};
  border-radius: calc(${theme.border.radius} * 4);

  .quote {
    font-size: ${theme.font.size.lg};
    font-weight: 500;
  }

  .author {
    font-size: ${theme.font.size.base};
    color: ${theme.fadeText};
  }
`

const Toolbar = styled("div")`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  width: max-content;
  z-index: 101;

  @media (max-width: 768px) {
    display: none;
  }
`

export const QuotesMasonry = () => {
  const [quotesData, setQuotesData] = createSignal<Quote[]>(quotes)

  const randomize = () => {
    const shuffled = [...quotes].sort(() => 0.5 - Math.random())
    // console.log({ shuffled })
    setQuotesData(shuffled)
  }

  // createEffect(() => {
  //   // console.log({ quotesData: quotesData() })
  // })

  return (
    <>
      <Toolbar slot="toolbar">
        <Button class="small" onClick={() => randomize()}>
          <iconify-icon icon={icons.shuffle} />
          Shuffle
        </Button>
      </Toolbar>
      <Masonry
        minColumns={1}
        maxColumns={4}
        colWidth={400}
        gap={1}
      // imageDimensions={[].map((item) => [item.w, item.h])}
      >
        <For each={quotesData()}>
          {(quote, i) => (
            <MasonryItem>
              <div class="quote">{quote.quote}</div>
              {quote.author && <div class="author">{quote.author}</div>}
            </MasonryItem>
          )}
        </For>
      </Masonry>
    </>
  )
}

