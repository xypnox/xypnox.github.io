type Args = {
  amount: number;
  format: string;
  group: number;
  sample: number;
}

type Data = Uint8ClampedArray

type Handler = (data: Data, args: Args) => Output

type Hex = string

type Input = (Hex | Rgb)[]

type CanvasEl = HTMLCanvasElement

type Output = Hex | Rgb | (Hex | Rgb)[]

export type Rgb = [r: number, g: number, b: number]

const getArgs = ({
  amount = 3,
  format = 'array',
  group = 20,
  sample = 10,
} = {}): Args => ({ amount, format, group, sample })

const format = (input: Input, args: Args): Output => {
  const list = input.map((val) => {
    const rgb = Array.isArray(val) ? val : val.split(',').map(Number) as Rgb
    return args.format === 'hex' ? rgbToHex(rgb) : rgb
  })

  return args.amount === 1 || list.length === 1 ? list[0] : list
}

const group = (number: number, grouping: number): number => {
  const grouped = Math.round(number / grouping) * grouping

  return Math.min(grouped, 255)
}

const rgbToHex = (rgb: Rgb): Hex => '#' + rgb.map((val) => {
  const hex = val.toString(16)

  return hex.length === 1 ? '0' + hex : hex
}).join('')

const getImageData = (canvas: HTMLCanvasElement): Promise<Data> =>
  new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // console.log('ctx', canvas.width, canvas.height);
      if (canvas.width === 0 || canvas.height === 0) {
        console.warn('Canvas is empty');
        reject('Canvas is empty');
      }
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      resolve(data)
    } else {
      reject('Canvas context not found')
    }
  })

const getAverage = (data: Data, args: Args): Output => {
  const gap = 4 * args.sample
  const amount = data.length / gap
  const rgb = { r: 0, g: 0, b: 0 }

  for (let i = 0; i < data.length; i += gap) {
    rgb.r += data[i]
    rgb.g += data[i + 1]
    rgb.b += data[i + 2]
  }

  return format([[
    Math.round(rgb.r / amount),
    Math.round(rgb.g / amount),
    Math.round(rgb.b / amount)
  ]], args)
}

const getProminent = (data: Data, args: Args): Output => {
  const gap = 4 * args.sample
  const colors: { [key: string]: number } = {}

  for (let i = 0; i < data.length; i += gap) {
    const rgb = [
      group(data[i], args.group),
      group(data[i + 1], args.group),
      group(data[i + 2], args.group),
    ].join()

    colors[rgb] = colors[rgb] ? colors[rgb] + 1 : 1
  }

  return format(
    Object.entries(colors)
      .sort(([_keyA, valA], [_keyB, valB]) => valA > valB ? -1 : 1)
      .slice(0, args.amount)
      .map(([rgb]) => rgb),
    args
  )
}

const process = async (handler: Handler, canvas: CanvasEl, args?: Partial<Args>): Promise<Output> => {
  const options = { ...getArgs(args), ...args }
  const data = await getImageData(canvas)

  return handler(data, options)
}


const average = (item: CanvasEl, args?: Partial<Args>) => process(getAverage, item, args)
const prominent = (item: CanvasEl, args?: Partial<Args>) => process(getProminent, item, args)

export { average, prominent }



/* ******************************************** */

export type ColorData = {
  color: string;
  count: number;
  rgb: Rgb;
  hsl: [number, number, number];
}

function getColorsCount(data: Data) {
  const colorCounts: Record<string, ColorData> = {};

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    const colorKey = `${r},${g},${b},${a}`;
    // Create a string representation of the color
    const color: ColorData = {
      color: `rgba(${r},${g},${b},${a})`,
      rgb: [r, g, b],
      count: 1,
      hsl: [getHue([r, g, b]), getSaturation([r, g, b]), getLightness([r, g, b])],
    };

    // Increment the count for this color
    if (colorCounts[colorKey]) {
      colorCounts[colorKey].count++;
    } else {
      colorCounts[colorKey] = color;
    }
  }

  return colorCounts;
}

export const getColors = async (item: CanvasEl) => {
  try {
    const data = await getImageData(item)
    const colorCounts = getColorsCount(data)
    return colorCounts
  } catch (error) {
    if (error === 'Canvas is empty') return {}
    console.error('Error in getColors', error);
    return {}
  }
}


const getHue = (rgb: Rgb) => {
  const [r, g, b] = rgb.map(v => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let hue = 0

  if (delta === 0) {
    hue = 0
  } else if (max === r) {
    hue = ((g - b) / delta) % 6
  } else if (max === g) {
    hue = (b - r) / delta + 2
  } else {
    hue = (r - g) / delta + 4
  }

  hue = Math.round(hue * 60)

  return hue < 0 ? 360 + hue : hue
}


const getLightness = (rgb: Rgb) => {
  const [r, g, b] = rgb.map(v => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  return (max + min) / 2
}

const getSaturation = (rgb: Rgb) => {
  const [r, g, b] = rgb.map(v => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  return delta === 0 ? 0 : delta / (1 - Math.abs(2 * (max + min) - 1))
}





