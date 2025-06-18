import { toast } from '@/components/ui/use-toast'
import { saveQuestions } from '@/services/question'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Question, questionSchema } from '../data/schema'
import { useState } from 'react'
import { defaultSteps } from '../data/constant'
import { QuestionList, QuestionListForm } from '@/services/question-list/schema'

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
    resolver: zodResolver(questionSchema),
  })
  const { control, register, setValue, handleSubmit, getValues } = method

  console.log('getValues', getValues())

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
