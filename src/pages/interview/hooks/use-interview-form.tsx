import { toast } from '@/components/ui/use-toast'
import { HTTPResponse, host } from '@/lib/utils'
import { QuestionList } from '@/services/question-list/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from 'react-router-dom'
import { otherQuestionList } from '../data/question-list'
import { Result, resultSchema } from '../data/schema'
import { categories } from '../../questions/id/data/label'
import { groupQuestionList } from '@/lib/convert/groupQuestionList'
import {
  getQuestionListUnchosen,
  postQuestionListOnChoose,
} from '@/services/question-list'
import { UnchosenList } from '@/services/question-list/type'
import useCommonErrors from '@/hooks/use-common-errors'

export default function useInterviewForm() {
  const { revalidate } = useRevalidator()
  const { data } = useLoaderData() as HTTPResponse<
    QuestionList & { unchosenList: UnchosenList }
  >

  const [openDialog, setOpenDialog] = useState(false)
  const defaultValues = {
    candidateName: '',
    isPass: false,
    note: '',
    questionList: data.questionList.map((item) => ({
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

  const unchosenList = data.unchosenList

  const { control, register, setValue, handleSubmit } = method

  const {} = useFieldArray({
    control,
    name: 'questionList',
  })

  const onSubmit = handleSubmit(async (data) => {
    const result = await fetch(host('/results/save'), {
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
    if (result.status === 400) {
      toast({
        title: '',
        description: 'Wrong Input!',
      })
    }
  })

  const onSelectQuestionList = async (id: string) => {
    const { status } = await postQuestionListOnChoose(id)
    if (status === 204) {
      revalidate()
      setOpenDialog(false)
    } else {
      useCommonErrors(status)
    }
  }

  return {
    method,
    control,
    categoryList,
    unchosenList,
    openDialog,
    setOpenDialog,
    register,
    setValue,
    onSubmit,
    onSelectQuestionList,
  } as const
}
