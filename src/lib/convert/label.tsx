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

export const convertLabelCategory = (value: string) => {
  return categories.find((category) => category.value === value)?.label
}
