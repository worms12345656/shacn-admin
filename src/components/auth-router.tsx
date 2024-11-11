import { ReactNode } from 'react'

type AuthRouterProps = {
  children: ReactNode
}

export default function AuthRouter({ children }: AuthRouterProps) {
  // const { auth, setAuth } = useAuth()

  // const navigate = useNavigate()
  // useEffect(() => {
  //   if (!auth.jwt) {
  //     navigate('/sign-in', { replace: true })
  //   }
  // }, [auth, setAuth])

  return <>{children}</>
}
