import { toast } from '@/components/ui/use-toast'
import { useArrayLoaderData } from '@/hooks/use-loader-data'
import { copyQuestion, deleteQuestion } from '@/services/question'
import { useNavigate } from 'react-router-dom'
import { Question } from '../data/schema'

export const useQuestion = () => {
  const questions = useArrayLoaderData<Question>()
  const navigate = useNavigate()

  const handleCopyQuestion = async (questionId: string) => {
    try {
      const { status } = await copyQuestion(questionId)
      if (status === 201) {
        navigate('/questions')
        toast({
          title: '',
          description: 'Copy successfully',
        })
      } else {
        toast({
          title: '',
          description: "Something's wrong",
        })
      }
    } catch (error) {
      toast({
        title: '',
        description: "Something's wrong",
      })
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const { status } = await deleteQuestion(questionId)
      if (status === 204) {
        navigate('/questions')
        toast({
          title: '',
          description: 'Delete successfully',
        })
      } else {
        toast({
          title: '',
          description: "Something's wrong",
        })
      }
    } catch (error) {
      toast({
        title: '',
        description: "Something's wrong",
      })
    }
  }

  return {
    questions,
    handleCopyQuestion,
    handleDeleteQuestion,
  }
}
