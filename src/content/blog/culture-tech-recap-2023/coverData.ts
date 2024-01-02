
const getTitle = (s: string) => {
  const title = s.split("/").pop()?.slice(0, -5) ?? ""
  //capitalize
  return title.charAt(0).toUpperCase() + title.slice(1)
}

export const coverData = [
  "/covers/Rep.webp",
  "/covers/MyFi.webp",
  "/covers/mellow.webp",
  "/covers/hyperchill.webp",
  "/covers/Eolian's.webp",
  "/covers/ElvenHigh.webp",
  "/covers/2023.01.i.webp",
  "/covers/2022.12.i.webp",
  "/covers/2022.11.ii.webp",
  "/covers/2022.03.ii.webp",
  "/covers/2022.01.i.webp",
  "/covers/2021.11.i.webp",
  "/covers/2021.05.01.webp",
  "/covers/2021.04.01.webp",
].map((s, i) => ({
  url: s,
  // Add /thubnails/ to the url after covers/
  thumbnail: s.replace("/covers/", "/covers/thumbnails/"),
  // remove the last webp
  title: getTitle(s),
  alt: s,
  link: s,
}))
