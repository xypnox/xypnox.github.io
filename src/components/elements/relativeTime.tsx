import { createEffect, createSignal, onCleanup } from "solid-js"
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
  const [date, setDate] = createSignal(new Date(props.date))
  const [relativeString, setRelativeString] = createSignal(getRelativeString(date()))

  createEffect(() => {
    const date = new Date(props.date)
    setDate(date)
    setRelativeString(getRelativeString(date))
  })

  const interval = setInterval(() => {
    setRelativeString(getRelativeString(date()))
  }, props.refreshInterval ?? 10000)

  onCleanup(() => clearInterval(interval))

  return <>{relativeString}</>
}

interface UpdatedProps {
  newVal: () => string
  refreshInterval?: number
}

/**
 * Acceps a function and a refresh interval,
 * Calls the function every refresh interval and updates the value in the UI
 */
export const Updated = (props: UpdatedProps) => {
  const [value, setValue] = createSignal(props.newVal())

  const interval = setInterval(() => {
    setValue(props.newVal())
  }, props.refreshInterval ?? 10000)

  onCleanup(() => clearInterval(interval))

  return <>{value()}</>
}
