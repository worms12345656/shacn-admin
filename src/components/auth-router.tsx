import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './session-provider'

type AuthRouterProps = {
  children: ReactNode
}

export default function AuthRouter({ children }: AuthRouterProps) {
  const navigate = useNavigate()
  const { auth } = useAuth()

  useEffect(() => {
    if (!auth.email) {
      navigate('/sign-up', { replace: true })
    } else if (!auth.purpose) {
      navigate('/purpose', { replace: true })
    }
  }, [auth.email, auth.purpose, navigate])

  return <>{children}</>
}
