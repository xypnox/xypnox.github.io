const cardTypes = [
  'project',
  'spotify',
  'location',
  'collab'
] as const

export type NowCardType = typeof cardTypes[number]

export interface NowCardData {
  type: NowCardType
  title: string
  label?: string
  description?: string
  url?: string
  image?: string
}

// const nowLabels: Record<NowCardType, string> = {
//   'project': 'Wasting precious human agency on',
//   'location': 'Most recent sighting',
//   'spotify': 'Shuffling songs from',
//   'collab': 'Collaborating with',
// }
export const data: {
  title: string
  description: string
  photo: string
  photoAlt: string
  cards: NowCardData[]
} = {
  title: 'What\'s he (supossedly) upto?',
  description: 'A view (only for the eyes of birds) of the places my time slips away to.',
  photo: '/logo.svg',
  photoAlt: "Widely and critically regarded as one of the photos captured of all time ever.",
  cards: [
    {
      type: 'location',
      label: 'Last (unconfirmed) sighting around',
      title: 'Bengaluru, India',
      description: 'Asia/Kolkata', // This should be acceptable by JS
      url: 'https://maps.app.goo.gl/ASV7hL8BT8F6cDXS8',
    },
    {
      type: 'project',
      label: 'Wasting (precious) human agency on',
      title: 'xip',
      url: 'https://github.com/xypnox/xip',
    },
    {
      type: 'collab',
      label: 'Building tools of automation (and intelligence) at',
      title: 'rifa-ai',
    },
    {
      type: 'collab',
      label: 'Managing interfaces (design & frontend) at',
      title: 'Calry',
      // description: 'The Unified API for Vacation Rental PMS Integrations',
      url: 'https://calry.app/',
    },
    {
      type: 'spotify',
      label: 'Shuffling songs (to dull the noise) from',
      title: '2024.06.i',
      url: 'https://open.spotify.com/playlist/2AX856iQoY01PCbyEdmHlk',
    },
    {
      type: 'project',
      label: 'Spotted converting divs (to semantic elements) on',
      title: 'tipedream',
      // description: 'Experiments with decent typography, and hardcore responsiveness.',
      url: 'https://github.com/xypnox/tipedream',
    },
  ]
}
