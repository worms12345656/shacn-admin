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
    // getValues,
  } as const
}
