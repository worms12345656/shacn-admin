import { toast } from '@/components/ui/use-toast'
import { saveQuestion } from '@/services/question'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Question, questionSchema } from '../data/schema'
import { useEffect, useMemo, useState } from 'react'
import { defaultSteps } from '../data/constant'
import { QuestionList, QuestionListForm } from '@/services/question-list/schema'
import { effect, z } from 'zod'
import { questionListFormSchema } from '@/services/question-list/schema'
import { saveQuestionList } from '@/services/question-list'
import { HTTPResponse } from '@/lib/utils'

export default function useQuestionList() {
  const questionsData = useLoaderData() as HTTPResponse<Question[]>

  const navigate = useNavigate()
  const [steps, setSteps] = useState(defaultSteps)
  const [currentStep, setCurrentStep] = useState('Information')
  const method = useForm<QuestionListForm>({
    defaultValues: {
      name: '',
      level: 'basic',
      questionListId: [],
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
    const { data, status } = await saveQuestionList({
      input,
    })

    console.log(data._id)

    if (status === 201) {
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
    questionsData,
    register,
    onChangeStep,
    setValue,
    onSubmit,
    onBackButton,
    getValues,
  } as const
}
