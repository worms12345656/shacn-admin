import { RadioGroup, RadioLabel } from '@/components/ui/radio-group'
import { Controller, useFormContext } from 'react-hook-form'
type Props = {
  name: string
}

export default function Rating({ name }: Props) {
  const { register, control } = useFormContext()
  return (
    <>
      <RadioGroup className='flex w-1/3 flex-row items-center justify-between'>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              {Array.from(Array(5), (_, index) => (
                <RadioLabel
                  key={`rating_${index}`}
                  onChange={() => {
                    field.onChange(index + 1)
                  }}
                  checked={field.value === index + 1}
                >
                  {index + 1}
                </RadioLabel>
              ))}
            </>
          )}
        ></Controller>
      </RadioGroup>
    </>
  )
}
