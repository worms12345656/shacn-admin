import { toast } from '@/components/ui/use-toast'
import useCommonErrors from '@/hooks/use-common-errors'
import { DataResponse } from '@/lib/api'
import { groupQuestionList } from '@/lib/convert/groupQuestionList'
import { postQuestionListOnChoose } from '@/services/question-list'
import { QuestionList } from '@/services/question-list/schema'
import { UnchosenList } from '@/services/question-list/type'
import { saveResult } from '@/services/result'
import { Interview, interviewSchema } from '@/services/result/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'

export default function useInterviewForm() {
  const { revalidate } = useRevalidator()
  const { handleCommonErrors } = useCommonErrors()
  const navigate = useNavigate()
  const { data } = useLoaderData() as DataResponse<
    QuestionList & { unchosenList: UnchosenList }
  >

  const { questionList, unchosenList } = data

  const [openDialog, setOpenDialog] = useState(false)
  const defaultValues = useMemo(
    () => ({
      candidateName: '',
      isPass: false,
      note: '',
      questionList: questionList.map((item) => ({
        questionId: item.id,
        summary: '',
        rating: 0,
      })),
    }),
    [questionList]
  )
  const categoryList = groupQuestionList(questionList)

  const method = useForm<Interview>({
    resolver: zodResolver(interviewSchema),
    defaultValues,
  })

  const { control, register, setValue, handleSubmit } = method

  // const {} = useFieldArray({
  //   control,
  //   name: 'questionList',
  // })

  const onSubmit = useCallback(
    async (input: Interview) => {
      const { data: result, status } = await saveResult({ input })
      if (status === 200) {
        toast({
          title: '',
          description: 'Save Result Successfully!',
        })
        navigate(`/results/${result?.id}`)
        return
      }
      if (status === 400) {
        toast({
          title: '',
          description: 'Wrong Input!',
        })
        return
      }
      handleCommonErrors(status)
    },
    [navigate, handleCommonErrors]
  )

  const onSelectQuestionList = useCallback(
    async (id: string) => {
      const { status } = await postQuestionListOnChoose(id)
      if (status === 204) {
        revalidate()
        setOpenDialog(false)
        return
      }
      handleCommonErrors(status)
    },
    [revalidate, handleCommonErrors]
  )

  return {
    method,
    control,
    categoryList,
    unchosenList,
    openDialog,
    setOpenDialog,
    register,
    setValue,
    onSubmit: handleSubmit(onSubmit),
    onSelectQuestionList,
  } as const
}
