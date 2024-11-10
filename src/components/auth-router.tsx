import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './middleware-provider'

type AuthRouterProps = {
  children: ReactNode
}

export default function AuthRouter({ children }: AuthRouterProps) {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!auth.jwt) {
      navigate('/sign-in', { replace: true })
    }
  }, [auth])

  return <>{children}</>
}
