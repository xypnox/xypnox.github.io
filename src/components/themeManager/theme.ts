import { forObjectReplace } from "../../lib/objects"

export const varTheme = () => {
  const obj = {
    base: {},
    font: {},
    colors: {},
  }

  const generatedTheme = forObjectReplace(obj, (keys) => `var(--${keys.join("-")})`)

  return generatedTheme
}
