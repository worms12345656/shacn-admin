import { ReactNode } from 'react'

type AuthRouterProps = {
  children: ReactNode
}

export default function AuthRouter({ children }: AuthRouterProps) {
  return <>{children}</>
}
