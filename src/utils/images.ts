import type { GetImageResult, ImageQuality } from "astro"
import { getImage } from "astro:assets"

export const checkImages = async (paths: string[]) => {

  const assetImages = import.meta.glob('../../src/assets/**/*')

  const missingImages: string[] = []

  // console.log('assetImages', assetImages)

  for (const path of paths) {
    if (!assetImages[`../assets${path}`]) {
      missingImages.push(path)
    }
  }

  if (missingImages.length > 0) {
    console.error('Missing images', { missingImages, paths })
  }

  return missingImages
}

interface ExtraConfig {
  widths: number[],
  quality: ImageQuality
}

const defaultConfig: ExtraConfig = {
  widths: [256, 512, 1200],
  quality: 85
}

export const optimizeImages = async (paths: string[], config: ExtraConfig) => {
  const assetImages = import.meta.glob('../../src/assets/**/*')
  const images: Record<string, GetImageResult> = {}

  // console.log('assetImages', { assetImages, paths })

  for (const path of paths) {
    const assetPath = `../assets${path}`
    // console.log('assetPath', { assetPath })
    if (!assetImages[assetPath]) {
      console.log('assetImages', paths)
      throw new Error(`Image not found: ${assetPath}`)
    }
    const ogImg = await assetImages[assetPath]()
    // console.log('assetPath', assetPath, { ogImg })
    const i = await getImage({ src: (ogImg as any).default as any, ...config })
    images[path] = i
  }

  return images
}

export const getImages = async (paths: string[], config = defaultConfig) => {
  const missingImages = await checkImages(paths)
  if (missingImages.length !== 0) {
    throw new Error(`Missing images: ${missingImages}`)
  }
  const images = await optimizeImages(paths, config)
  return images
}

export const getImagesOfDir = async (path: string, config = defaultConfig) => {
  const dirImages = import.meta.glob('../../src/assets/**/*')

  const filteredImages =
    Object.keys(dirImages)
      .filter((key) => key.startsWith(`../assets/${path}`))

  const paths =
    filteredImages
      .map((key) => key.replace('../assets', ''))

  console.log('filteredImages', { filteredImages, paths })

  const missingImages = await checkImages(paths)

  if (missingImages.length !== 0) {
    throw new Error(`Missing images: ${missingImages}`)
  }

  const images = await optimizeImages(paths, config)
  return images
}
