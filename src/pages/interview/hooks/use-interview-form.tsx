import fs from 'fs'
import { useFieldArray, useForm } from 'react-hook-form'
import { data } from '../data/data'
import { Result } from '../data/schema'

export default function useInterviewForm() {
  const method = useForm<Result>({
    defaultValues: {
      candidateName: '',
      isPass: false,
      note: '',
      category: data.map((item) =>
        item.questionList.map((item) => ({
          questionId: item.questionId,
          summary: '',
          rating: 0,
        }))
      ),
    },
  })
  const { control, register, setValue, handleSubmit } = method
  const {} = useFieldArray({
    control,
    name: 'category',
  })

  const onSubmit = handleSubmit((data) => {
    fs.writeFile('../data/result.json', JSON.stringify(data), (err) => {
      console.log('error', err)
    })
  })

  return {
    method,
    control,
    register,
    setValue,
    onSubmit,
  } as const
}
