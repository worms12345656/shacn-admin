import { ReactNode, createContext, useContext, useState } from 'react'

type User = {
  name: string
  jwt: string
}

type MiddlewareProviderProps = {
  children: ReactNode
}

type MiddlewareProviderState = {
  auth: User
  setAuth: (auth: User) => void
}

const initalState: MiddlewareProviderState = {
  auth: {
    jwt: '',
    name: '',
  },
  setAuth: () => null,
}

const MiddlewareProviderContext =
  createContext<MiddlewareProviderState>(initalState)

export function MiddlewareProvider({
  children,
  ...props
}: MiddlewareProviderProps) {
  const [auth, setAuth] = useState<User>(initalState.auth)
  const value = {
    auth,
    setAuth: (auth: User) => {
      setAuth(auth)
    },
  }
  return (
    <MiddlewareProviderContext.Provider {...props} value={value}>
      {children}
    </MiddlewareProviderContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(MiddlewareProviderContext)

  if (context === undefined)
    throw new Error('useAuth must be used within a MiddlewareProvider')

  return context
}
