import { Button } from '@/components/custom/button'
type Props = {
  onClick: (value: number) => void
}

export default function Rating({ onClick }: Props) {
  return (
    <>
      {Array.from(Array(5), (_, index) => (
        <Button
          key={`rating_${index}`}
          type='button'
          onClick={() => onClick(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </>
  )
}
