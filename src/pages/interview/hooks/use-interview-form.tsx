import { toast } from '@/components/ui/use-toast'
import { host } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { data } from '../data/data'
import { Result, resultSchema } from '../data/schema'

export default function useInterviewForm() {
  const defaultValues = {
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
  }

  const method = useForm<Result>({
    resolver: zodResolver(resultSchema),
    defaultValues,
  })

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = method
  console.log('err', errors)

  const {} = useFieldArray({
    control,
    name: 'category',
  })

  const onSubmit = handleSubmit(async (data) => {
    const result = await fetch(host('/result/save'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (result.status === 200) {
      toast({
        title: '',
        description: 'Save Result Successfully!',
      })
    }
  })

  return {
    method,
    control,
    register,
    setValue,
    onSubmit,
  } as const
}
