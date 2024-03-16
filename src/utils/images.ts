import type { GetImageResult } from "astro"
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
    console.log('Missing images', { missingImages, paths })
  }

  return missingImages
}

export const optimizeImages = async (paths: string[]) => {
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
    const i = await getImage({ src: (ogImg as any).default as any, widths: [256, 512, 1200] })
    images[path] = i
  }

  return images
}
