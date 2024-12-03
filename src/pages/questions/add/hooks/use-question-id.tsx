import { toast } from '@/components/ui/use-toast'
import { saveQuestions } from '@/services/question'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Question } from '../data/schema'

export default function useQuestionId() {
  const navigate = useNavigate()
  const method = useForm<Question>({
    defaultValues: {
      name: '',
      category: 'frontEnd',
      level: 'basic',
      hint: '',
    },
  })
  const { control, register, setValue, handleSubmit, getValues } = method

  const onSubmit = handleSubmit(async (input) => {
    const { data, status } = await saveQuestions({ input })

    if (status === 201) {
      navigate(`/questions/${data.data._id}`)
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
  })

  const onBackButton = () => {
    navigate('/questions')
  }

  return {
    method,
    control,
    register,
    setValue,
    onSubmit,
    onBackButton,
    getValues,
  } as const
}
