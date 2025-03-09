import { useNavigate } from 'react-router-dom'

export default function useCommonErrors(status: number) {
  const navigate = useNavigate()

  switch (status) {
    case 400: {
      navigate('/400')
      break
    }
    case 404: {
      navigate('/404')
      break
    }
    case 503: {
      navigate('/404')
      break
    }
    default: {
      navigate('/500')
      break
    }
  }
}
