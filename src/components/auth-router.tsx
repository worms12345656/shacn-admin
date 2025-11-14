import { ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

type AuthRouterProps = {
  children: ReactNode
}

export default function AuthRouter({ children }: AuthRouterProps) {
  return <>{children}</>
}
