import { toast } from '@/components/ui/use-toast'
import { saveQuestion } from '@/services/question'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { defaultSteps } from '../data/constant'
import {
  QuestionListEditForm,
  QuestionListForm,
} from '@/services/question-list/schema'
import { effect, z } from 'zod'
import { questionListFormSchema } from '@/services/question-list/schema'
import { saveQuestionList, updateQuestionList } from '@/services/question-list'
import { HTTPResponse } from '@/lib/utils'
import {
  QuestionList,
  ResponseQuestionList,
} from '@/services/question-list/type'
import { Question, ResponseQuestions } from '@/services/question/type'

type Props = {
  questionListData: QuestionList
  questions: Question[]
}

export default function useQuestionList() {
  const params = useParams()
  const { data } = useLoaderData() as HTTPResponse<Props>
  const { questionListData, questions } = data

  const navigate = useNavigate()
  const [steps, setSteps] = useState(defaultSteps)
  const [currentStep, setCurrentStep] = useState('Information')
  const method = useForm<QuestionListEditForm>({
    defaultValues: {
      id: questionListData.id,
      name: questionListData.name,
      level: questionListData.level,
      questionListId: questionListData.questionListId,
    },
    resolver: zodResolver(questionListFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const {
    control,
    register,
    setValue,
    handleSubmit,
    getValues,
    formState,
    trigger,
  } = method

  const values = useWatch({ control })

  const { errors } = formState

  const onSubmit = handleSubmit(async (input) => {
    const { status } = await updateQuestionList({
      id: params.id,
      input,
    })

    if (status === 204) {
      navigate(`/question-list`)
      toast({
        title: '',
        description: 'Save Result Successfully!',
      })
    } else {
      toast({
        title: '',
        description: "Something's wrong",
      })
    }
    console.log(input)
  })

  useMemo(() => {
    trigger()
  }, [])

  const onBackButton = () => {
    navigate('/question-list')
  }
  console.log(values.name)

  const onChangeStep = (step: string) => {
    setCurrentStep(step)
    setSteps([
      {
        children: 'Information',
        completed: errors.name === undefined || !errors.name,
        step: 'Information',
      },
      {
        children: 'Questions',
        completed:
          errors.questionListId === undefined || !errors.questionListId,
        step: 'Questions',
      },
    ])
  }

  return {
    method,
    control,
    steps,
    currentStep,
    errors,
    questions,
    register,
    onChangeStep,
    setValue,
    onSubmit,
    onBackButton,
    getValues,
  } as const
}
