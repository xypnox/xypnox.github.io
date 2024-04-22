import { createSignal, onCleanup } from "solid-js"
import { formatDistanceToNow } from "date-fns"

const getRelativeString = (date: Date) => {
  return formatDistanceToNow(date, {
    addSuffix: true // Adds 'ago' or 'in' 
  })
}

interface Props {
  date: number
  refreshInterval?: number
}

export const RelativeTime = (props: Props) => {
  const date = new Date(props.date)
  const [relativeString, setRelativeString] = createSignal(getRelativeString(date))

  const interval = setInterval(() => {
    setRelativeString(getRelativeString(date))
  }, props.refreshInterval ?? 1000)

  onCleanup(() => clearInterval(interval))

  return <>{relativeString}</>
}
