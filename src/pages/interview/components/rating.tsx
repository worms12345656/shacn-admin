import { RadioGroup, RadioLabel } from '@/components/ui/radio-group'
import { useFormContext } from 'react-hook-form'
type Props = {
  name: string
}

export default function Rating({ name }: Props) {
  const { register } = useFormContext()
  return (
    <>
      <RadioGroup className='flex w-1/3 flex-row items-center justify-between'>
        {Array.from(Array(5), (_, index) => (
          <RadioLabel
            key={`rating_${index}`}
            {...register(name)}
            value={index + 1}
          >
            {index + 1}
          </RadioLabel>
        ))}
      </RadioGroup>
    </>
  )
}
