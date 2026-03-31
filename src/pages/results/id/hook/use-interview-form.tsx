import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { data } from '../data/data'
import { useData } from '@/hooks/use-loader-data'
import { groupQuestionListWithRating } from '@/lib/convert/groupQuestionList'
import { Result } from '@/services/result/type'

export default function useInterviewForm() {
  const navigate = useNavigate()
  const result = useData<Result>()

  const [categoryList] = useState(
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

  const handleBack = () => {
    navigate('/results')
  }

  return {
    result,
    categoryList,
    handleBack,
    // onSelectQuestionList,
  } as const
}
