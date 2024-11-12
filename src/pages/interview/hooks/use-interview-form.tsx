import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { data } from '../data/data'
import { Result, resultSchema } from '../data/schema'

export default function useInterviewForm() {
  const method = useForm<Result>({
    resolver: zodResolver(resultSchema),
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
    console.log('data', data)
  })

  return {
    method,
    control,
    register,
    setValue,
    onSubmit,
  } as const
}
