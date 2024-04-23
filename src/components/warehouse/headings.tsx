import { Dynamic } from "solid-js/web"
import { slugify } from "../../lib/text"

export interface HeadingSpec {
  title: string
  level: number
}

/**
 * Generates the helper heading function that will by typed by title and return the heading to be passed to the props
 */
const hg = <T extends HeadingSpec>(k: readonly T[]) => (title: T["title"]): HeadingSpec => {
  return k.filter((heading) => heading.title === title)[0]
}

// A 
const headings = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

const Heading = (props: { h: HeadingSpec }) => {
  return (<Dynamic
    component={headings[props.h.level]}
    id={slugify(props.h.title)}
  >{props.h.title}</Dynamic>)
}


export {
  hg, Heading
}
