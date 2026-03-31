export const categories = [
  {
    value: 'frontEnd',
    label: 'FrontEnd',
  },
  {
    value: 'backEnd',
    label: 'BackEnd',
  },
  {
    value: 'database',
    label: 'Database',
  },
]

export const convertLabelCategory = (value: string) => {
  return categories.find((category) => category.value === value)?.label
}

export const levels = [
  {
    label: 'Basic',
    value: 'basic',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Advance',
    value: 'advance',
  },
]
