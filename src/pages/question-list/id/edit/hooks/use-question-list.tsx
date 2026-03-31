import { toast } from '@/components/ui/use-toast'
import { useData } from '@/hooks/use-loader-data'
import { updateQuestionList } from '@/services/question-list'
import {
  QuestionListEditForm,
  questionListFormSchema,
} from '@/services/question-list/schema'
import { QuestionList } from '@/services/question-list/type'
import { Question } from '@/services/question/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { defaultSteps } from '../data/constant'

type Props = {
  questionListData: QuestionList
  questions: Question[]
}

export default function useQuestionList() {
  const params = useParams()
  const data = useData<Props>()
  const { questionListData, questions } = data

  console.log('data', data)

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
