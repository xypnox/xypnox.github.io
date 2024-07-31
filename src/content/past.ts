type CommonEvent = {
  category: 'personal' | 'work' | 'consult' | 'education' | 'award'
  icon: string // use iconify icons
  title: string
  url?: string
  column?: number
  start: string
}
type PastEvent = {
  type: 'event'
  end?: string
  url?: string
  current?: boolean
} & CommonEvent | {
  type: 'milestone'
  url?: string
} & CommonEvent

export const data: {
  description: string
  events: PastEvent[]
} = {
  description: 'A chronological log of the events of my life.',
  events: [
    // WORK
    {
      type: 'event',
      category: 'consult',
      icon: 'ph:briefcase',
      title: 'Calry',
      // column: 2,
      start: '2023-10-01',
      current: true,
      url: '/project/calry'
    },
    {
      type: 'event',
      category: 'work',
      icon: 'ph:briefcase',
      title: 'Calry',
      // column: 2,
      start: '2023-03-01',
      end: '2023-08-30',
      url: '/project/calry'
    },
    {
      type: 'event',
      category: 'work',
      icon: 'ph:briefcase',
      title: 'Flataway',
      start: '2024-07-01',
      current: true,
    },
    {
      type: 'event',
      category: 'consult',
      icon: 'ph:briefcase',
      title: 'rifa.ai',
      start: '2024-05-01',
      current: true,
    },
    {
      type: 'event',
      category: 'consult',
      icon: 'ph:briefcase',
      title: 'Fifthtry',
      start: '2024-03-01',
      end: '2024-03-31',
    },
    {
      type: 'event',
      category: 'personal',
      icon: '',
      title: 'notes',
      start: '2022-03-01',
      current: true,
      url: '/project/notes'
    },
    {
      type: 'event',
      category: 'personal',
      icon: '',
      title: 'xip',
      start: '2024-02-01',
      current: true,
      url: 'https://xip.netlify.app/',
    },
    {
      type: 'event',
      category: 'work',
      icon: 'ph:briefcase',
      title: 'Finbox',
      start: '2019-05-01',
      end: '2019-07-31',
      url: '/project/finbox/'
    },
    {
      type: 'event',
      category: 'work',
      icon: 'ph:briefcase',
      title: 'Workduck',
      start: '2021-04-01',
      end: '2023-01-01',
      url: '/project/workduck/'
    },
    {
      type: 'event',
      category: 'work',
      icon: 'ph:briefcase',
      title: 'Fifthtry',
      start: '2020-07-01',
      end: '2020-09-31',
      url: '/project/fifthtry/'
    },

    // Education

    {
      type: 'event',
      category: 'education',
      icon: '',
      title: 'Physics, KGP',
      start: '2017-06-01',
      end: '2022-08-01'
    },
    {
      type: 'event',
      category: 'education',
      icon: '',
      title: 'KOSS',
      start: '2018-02-01',
      end: '2022-08-01'
    },
    // <iconify-icon icon="ph:trophy-duotone"></iconify-icon>
    {
      type: 'milestone',
      category: 'award',
      icon: 'ph:trophy-duotone',
      title: 'GrameenSetu',
      start: '2022-08-01',
      url: '/project/grameen-setu/'
    },
    {
      type: 'milestone',
      category: 'award',
      icon: 'ph:trophy-duotone',
      title: 'MARG',
      start: '2021-08-01',
      url: '/project/marg/'
    },
  ]
}


// This includes the layout positions in grid of the past events
type PastEventRender = PastEvent & {
  gridStart: number
  gridSpan?: number
}

const monthDistance = (date: Date, date2 = new Date()) => {
  // Take year into consideration
  const t = date2.getTime() - date.getTime()
  return t / (1000 * 60 * 60 * 24 * 30)
}

export const pastEventRender: PastEventRender[] = data.events.map((event, index) => {
  if (event.type === 'milestone') {
    return {
      ...event,
      gridStart: Number(monthDistance(new Date(event.start)).toFixed(0)),
    }
  }
  // End distance in months
  const endDistance = monthDistance(new Date(event.start), event.end ? new Date(event.end) : new Date()).toFixed(0)

  return {
    ...event,
    gridStart: event.end !== undefined
      ? Number(monthDistance(new Date(event.end)).toFixed(0))
      : Number(monthDistance(new Date()).toFixed(0)),
    gridSpan: Number(endDistance),
  }
})

export const legends = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024].map(year => (
  {
    title: year.toString(),
    gridStart: year === 2024 ? 1 : (Number(monthDistance(new Date(`${year}-12-31`)).toFixed(0))),
    gridSpan: year === 2024
      ? Number(new Date().getMonth())
      : 12,
  }
))

export const totalMonths = Number(monthDistance(new Date('2017-01-01')).toFixed(0))
