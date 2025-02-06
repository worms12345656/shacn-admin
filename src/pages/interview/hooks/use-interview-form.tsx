import { toast } from '@/components/ui/use-toast'
import { HTTPResponse, host } from '@/lib/utils'
import { QuestionList } from '@/services/question-list/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useLoaderData } from 'react-router-dom'
import { otherQuestionList } from '../data/question-list'
import { Result, resultSchema } from '../data/schema'
import { questionList } from '../../results/id/data/question-list'
import { data } from '../data/data'
import { categories } from '../../questions/id/data/label'
import { groupQuestionList } from '@/lib/convert/groupQuestionList'

// type Category = {
//   categoryName: string
//   questionList: {
//     questionId: string
//     questionName: string
//     hint: string
//   }[]
// }

export default function useInterviewForm() {
  // const { data } = useLoaderData() as HTTPResponse<QuestionList>
  const [questionList, setQuestionList] = useState(data.questionList)
  const defaultValues = {
    candidateName: '',
    isPass: false,
    note: '',
    questionList: questionList.map((item) => ({
      questionId: item.id,
      summary: '',
      rating: 0,
    })),
  }
  const categoryList = groupQuestionList(data.questionList)

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
    name: 'questionList',
  })

  const onSubmit = handleSubmit(async (data) => {
    console.log('data', data)

    // const result = await fetch(host('/results/save'), {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
    // if (result.status === 200) {
    //   toast({
    //     title: '',
    //     description: 'Save Result Successfully!',
    //   })
    // }
  })

  const onSelectQuestionList = (id: string) => {
    const index = otherQuestionList.findIndex((item) => item.id === id)
    if (index < 0) return
    setValue(
      'questionList',
      questionList.map((item) => ({
        questionId: item.id,
        summary: '',
        rating: 0,
      }))
    )
    // setCategoryList(category)
  }

  return {
    method,
    control,
    categoryList,
    register,
    setValue,
    onSubmit,
    onSelectQuestionList,
  } as const
}
