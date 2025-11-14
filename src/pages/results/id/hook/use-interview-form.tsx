import { toast } from '@/components/ui/use-toast'
import { HTTPResponse, host } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
// import { data } from '../data/data'
import { questionList } from '../data/question-list'
import { resultSchema } from '../data/schema'
import { useLoaderData } from 'react-router-dom'
import { Category } from '@/services/result/schema'
import { ResponseResult, Result } from '@/services/result/type'
import {
  groupQuestionList,
  groupQuestionListWithRating,
} from '@/lib/convert/groupQuestionList'

export default function useInterviewForm() {
  const { data: result } = useLoaderData() as HTTPResponse<Result>

  const [categoryList, setCategoryList] = useState(
    groupQuestionListWithRating(result.resultList)
  )
  // const defaultValues = {
  //   candidateName: '',
  //   isPass: false,
  //   note: '',
  //   category: data..map((item) =>
  //     item.questionList.map((item) => ({
  //       questionId: item.questionId,
  //       summary: '',
  //       rating: 0,
  //     }))
  //   ),
  // }

  // const {
  //   control,
  //   register,
  //   setValue,
  //   handleSubmit,
  //   formState: { errors },
  // } = method
  // console.log('err', errors)

  // const {} = useFieldArray({
  //   control,
  //   name: 'category',
  // })

  // const onSubmit = handleSubmit(async (data) => {
  //   // console.log('data', data)

  //   const result = await fetch(host('/result/save'), {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   })
  //   if (result.status === 200) {
  //     toast({
  //       title: '',
  //       description: 'Save Result Successfully!',
  //     })
  //   }
  // })

  // const onSelectQuestionList = (id: string) => {
  //   const index = questionList.findIndex((item) => item.id === id)
  //   if (index < 0) return
  //   const category = questionList[index].categories
  //   setValue(
  //     'category',
  //     category.map((item) =>
  //       item.questionList.map((item) => ({
  //         questionId: item.questionId,
  //         summary: '',
  //         rating: 0,
  //       }))
  //     )
  //   )
  //   setCategoryList(category)
  // }

  return {
    result,
    categoryList,
    // onSelectQuestionList,
  } as const
}
