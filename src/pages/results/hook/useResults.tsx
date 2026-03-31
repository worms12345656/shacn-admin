import { useNavigate } from 'react-router-dom'

export default function useResults() {
  const navigate = useNavigate()

  const handleEdit = (id: string) => {
    navigate(`/results/${id}`)
  }

  return {
    handleEdit,
  } as const
}
