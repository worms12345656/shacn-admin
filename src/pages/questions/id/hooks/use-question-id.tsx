import { toast } from '@/components/ui/use-toast'
import { HTTPResponse, host } from '@/lib/utils'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { Question } from '../data/schema'

export default function useQuestionId() {
  const { id: questionId } = useParams()
  const data = useLoaderData() as HTTPResponse<Question>
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()
  const method = useForm<Question>({
    defaultValues: {
      name: data.data.name,
      category: data.data.category,
      level: data.data.level,
      hint: data.data.hint,
    },
  })
  const { control, register, setValue, handleSubmit, getValues } = method

  const onSubmit = handleSubmit(async (data) => {
    const result = await fetch(host(`/questions/${questionId}/update`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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
