import { toast } from '@/components/ui/use-toast'
import { useData } from '@/hooks/use-loader-data'
import { host } from '@/lib/utils'
import { updateQuestion } from '@/services/question'
import { Question } from '@/services/question/type'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export default function useQuestionId() {
  const { id: questionId } = useParams()
  const data = useData<Question>()
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()
  const method = useForm<Question>({
    defaultValues: {
      id: questionId,
      name: data.name,
      category: data.category,
      level: data.level,
      hint: data.hint,
    },
  })
  const { control, register, setValue, handleSubmit, getValues } = method

  const onSubmit = handleSubmit(async (input) => {
    const result = await updateQuestion({
      input,
    })
    if (result.status === 201) {
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

  const onClickEdit = () => {
    setIsEdit(true)
  }

  const onClickSave = () => {
    setIsEdit(false)
    onSubmit()
  }

  const onBackButton = () => {
    navigate('/questions')
  }

  const onDeleteButton = async () => {
    await fetch(host(`/questions/${questionId}/delete`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.status === 204) {
        navigate('/questions')
        toast({
          title: '',
          description: 'Delete Result Successfully!',
        })
      } else {
        toast({
          title: '',
          description: "Something's wrong",
        })
      }
    })
  }

  return {
    questionId,
    isEdit,
    method,
    control,
    register,
    setValue,
    onSubmit,
    onClickEdit,
    onClickSave,
    onBackButton,
    onDeleteButton,
    getValues,
  } as const
}
