import { toast } from '@/components/ui/use-toast'
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
import { categories } from '../../questions/id/data/label'
import { groupQuestionList } from '@/lib/convert/groupQuestionList'
import {
  getQuestionListUnchosen,
  postQuestionListOnChoose,
} from '@/services/question-list'
import { UnchosenList } from '@/services/question-list/type'
import useCommonErrors from '@/hooks/use-common-errors'
import { saveResult } from '@/services/result'
import { Interview, interviewSchema } from '@/services/result/schema'
import { DataResponse, HttpResponse } from '@/lib/api'

export default function useInterviewForm() {
  const { revalidate } = useRevalidator()
  const navigate = useNavigate()
  const { data } = useLoaderData() as DataResponse<
    QuestionList & { unchosenList: UnchosenList }
  >

  const { questionList, unchosenList } = data

  const [openDialog, setOpenDialog] = useState(false)
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
  const categoryList = groupQuestionList(questionList)

  const method = useForm<Interview>({
    resolver: zodResolver(interviewSchema),
    defaultValues,
  })

  const { control, register, setValue, handleSubmit } = method

  const {} = useFieldArray({
    control,
    name: 'questionList',
  })

  const onSubmit = handleSubmit(async (input) => {
    const result = await saveResult({ input })
    if (result.status === 200) {
      toast({
        title: '',
        description: 'Save Result Successfully!',
      })
      navigate(`/results/${result.data.id}`)
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
