import { toast } from '@/components/ui/use-toast'
import { saveQuestions } from '@/services/question'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Question, questionSchema } from '../data/schema'
import { useEffect, useState } from 'react'
import { defaultSteps } from '../data/constant'
import { QuestionList, QuestionListForm } from '@/services/question-list/schema'
import { z } from 'zod'
import { questionListFormSchema } from '@/services/question-list/schema'

export default function useQuestionList() {
  const navigate = useNavigate()

  const [steps, setSteps] = useState(defaultSteps)
  const [currentStep, setCurrentStep] = useState('Information')
  const method = useForm<QuestionListForm>({
    defaultValues: {
      name: '',
      level: 'basic',
      questionList: [],
    },
    resolver: zodResolver(questionListFormSchema),
  })
  const {
    control,
    register,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState,
  } = method

  console.log('getValues', getValues())
  console.log('getValues', formState.errors)

  const onSubmit = handleSubmit(async (input) => {
    // const { data, status } = await saveQuestions({
    //   input: {
    //     ...input,
    //     id: '',
    //   },
    // })

    // console.log(data._id)

    // if (status === 201) {
    //   navigate(`/questions/${data._id}`)
    //   toast({
    //     title: '',
    //     description: 'Save Result Successfully!',
    //   })
    // } else {
    //   toast({
    //     title: '',
    //     description: "Something's wrong",
    //   })
    // }
    console.log(input)
  })

  const onBackButton = () => {
    navigate('/questions-list')
  }

  const onChangeStep = (step: string) => {
    setCurrentStep(step)
  }

  useEffect(() => {
    console.log('run')
    console.log(
      questionListFormSchema.shape.questionList.safeParse(watch('questionList'))
        .success
    )

    if (questionListFormSchema.shape.name.safeParse(watch('name')).success) {
      steps[0] = {
        children: 'Information',
        completed: true,
        step: 'Information',
      }
      setSteps(steps)
    } else {
      steps[0] = {
        children: 'Information',
        completed: false,
        step: 'Information',
      }
      setSteps(steps)
    }
    if (
      questionListFormSchema.shape.questionList.safeParse(watch('questionList'))
        .success
    ) {
      steps[1] = {
        children: 'Questions',
        completed: true,
        step: 'Questions',
      }
      setSteps(steps)
    } else {
      steps[1] = {
        children: 'Questions',
        completed: false,
        step: 'Questions',
      }
      setSteps(steps)
    }
  }, [currentStep])

  return {
    method,
    control,
    steps,
    currentStep,
    register,
    onChangeStep,
    setValue,
    onSubmit,
    onBackButton,
    getValues,
  } as const
}
