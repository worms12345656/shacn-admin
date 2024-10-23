import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from '@radix-ui/react-icons'

export const categories = [
  {
    value: 'frontEnd',
    label: 'Front End',
  },
  {
    value: 'backEnd',
    label: 'Back End',
  },
  {
    value: 'database',
    label: 'Database',
  },
]

export const levels = [
  {
    label: 'Basic',
    value: 'basic',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'Advance',
    value: 'advance',
    icon: ArrowUpIcon,
  },
]
