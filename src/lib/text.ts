export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
}

export const stripChar = (str: string, char: string) => {
  // Strip char from start and end of string
  return str.replace(new RegExp(`^${char}+|${char}+$`, 'g'), '')
}

export const trimChar = (str: string, char: string) => {
  // Trim as many chars from start and end of string as possible
  return str.replace(new RegExp(`^${char}+|${char}+$`, 'g'), '')
}

export const padChar = (str: string, char: string) => {
  // Only pad if not already padded on both sides
  if (str.startsWith(char) && str.endsWith(char)) {
    return str
  }
  return `${char}${str}${char}`
}

