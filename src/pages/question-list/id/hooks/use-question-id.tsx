import { useData } from '@/hooks/use-loader-data'
import { QuestionList } from '@/services/question-list/schema'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useQuestionId() {
  const questionListInfo = useData<QuestionList>()

  const [isEdit] = useState(false)
  const navigate = useNavigate()
  // const method = useForm<Question>({
  //   defaultValues: {
  //     name: data.data.name,
  //     category: data.data.category,
  //     level: data.data.level,
  //     hint: data.data.hint,
  //   },
  // })
  // const { control, register, setValue, handleSubmit, getValues } = method

  // const onSubmit = handleSubmit((data) => {
  //   console.log('data', data)

  //   // fs.writeFile('../data/result.json', JSON.stringify(data), (err) => {
  //   //   console.log('error', err)
  //   // })
  // })

  const onBackButton = () => {
    navigate('/question-list')
  }

  return {
    isEdit,
    questionListInfo,
    // control,
    // register,
    // setValue,
    // onSubmit,
    onBackButton,
    // getValues,
  } as const
}
