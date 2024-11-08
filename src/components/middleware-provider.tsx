import { ReactNode, createContext, useContext, useState } from 'react'

type MiddlewareProviderProps = {
  children: ReactNode
}

type MiddlewareProviderState = {
  auth: string
  setAuth: (auth: string) => void
}

const initalState: MiddlewareProviderState = {
  auth: '',
  setAuth: () => null,
}

const MiddlewareProviderContext =
  createContext<MiddlewareProviderState>(initalState)

export function MiddlewareProvider({
  children,
  ...props
}: MiddlewareProviderProps) {
  const [auth, setAuth] = useState<string>('')
  const value = {
    auth,
    setAuth: (auth: string) => {
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
