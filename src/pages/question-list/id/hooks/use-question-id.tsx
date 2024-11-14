import { HTTPResponse } from '@/lib/utils'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Question } from '../data/schema'

export default function useQuestionId() {
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

  const onSubmit = handleSubmit((data) => {
    console.log('data', data)

    // fs.writeFile('../data/result.json', JSON.stringify(data), (err) => {
    //   console.log('error', err)
    // })
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

  return {
    isEdit,
    method,
    control,
    register,
    setValue,
    onSubmit,
    onClickEdit,
    onClickSave,
    onBackButton,
    getValues,
  } as const
}
