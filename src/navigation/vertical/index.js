import { Clock, Watch } from 'react-feather'

export default [
  {
    id: 'timer',
    title: 'Countdown',
    icon: <Clock size={20} />,
    navLink: '/timer'
  },
  {
    id: 'stopwatch',
    title: 'Stopwatch',
    icon: <Watch size={20} />,
    navLink: '/stopwatch'
  }
]
