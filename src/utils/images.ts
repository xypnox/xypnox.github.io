import { getImage } from "astro:assets"

export const checkImages = async (paths: string[]) => {

  const assetImages = import.meta.glob('../../src/assets/**/*')

  const missingImages: string[] = []

  console.log('assetImages', assetImages)

  for (const path of paths) {
    if (!assetImages[`../assets${path}`]) {
      missingImages.push(path)
    }
  }

  return missingImages
}

export const thumbImages = async (paths: string[]) => {
  const assetImages = import.meta.glob('../../src/assets/**/*')
  const thumbImages: Record<string, string> = {}

  console.log('assetImages', { assetImages, paths })

  for (const path of paths) {
    // Here path is of the form ../src/assets/2021.01.webp, so we need to remove the /src/ bit with /
    const assetPath = path.replace('/src/', '/')
    const ogImg = await assetImages[assetPath]()
    console.log('assetPath', assetPath, { ogImg })
    const thumb = await getImage({ src: (ogImg as any).default as any, width: 200 })
    thumbImages[path] = thumb.src
  }

  return thumbImages
}
// const thumbnails = collages.reduce((p, col, i) => ({
//   ...p,
//   ...col.images.reduce((p, img) => ({
//     ...p,
//     [img.url]: getImage({ src: img.url, width: 200 }),
//   }), {}),
// }), {} as Record<string, string>);

