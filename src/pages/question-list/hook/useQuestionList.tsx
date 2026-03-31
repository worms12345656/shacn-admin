import { copyQuestionList } from '@/services/question-list'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useQuestionList() {
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()

  const onClickEdit = () => {
    setIsEdit(true)
  }

  const onClickSave = () => {
    setIsEdit(false)
  }

  const onBackButton = () => {
    navigate('/question-list')
  }

  const handleEdit = (id: string) => {
    navigate(`/question-list/${id}/edit`)
  }

  const handleCopy = async (id: string) => {
    try {
      const { data } = await copyQuestionList(id)
      if (data) {
        navigate(`/question-list`)
      }
    } catch (error) {
      console.error('Failed to copy question list:', error)
    }
  }

  return {
    isEdit,
    // method,
    // control,
    // register,
    // setValue,
    // onSubmit,
    onClickEdit,
    onClickSave,
    onBackButton,
    handleEdit,
    handleCopy,
    // getValues,
  } as const
}
