export const capitalize = (str: string) => {
  if (typeof str !== 'string') {
    return ''
  }
  if (str.length === 0) {
    return ''
  }
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


export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
