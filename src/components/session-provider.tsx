import { ReactNode, createContext, useContext, useState } from 'react'

type User = {
  name: string
  jwt: string
}

type SessionProviderProps = {
  children: ReactNode
}

type SessionProviderState = {
  auth: User
  setAuth: (auth: User) => void
}

const initalState: SessionProviderState = {
  auth: {
    jwt: '',
    name: '',
  },
  setAuth: () => null,
}

const SessionProviderContext = createContext<SessionProviderState>(initalState)

export function SessionProvider({ children, ...props }: SessionProviderProps) {
  const [auth, setAuth] = useState<User>(initalState.auth)
  const value = {
    auth,
    setAuth: (auth: User) => {
      console.log('ancd')

      setAuth(auth)
    },
  }

  return (
    <SessionProviderContext.Provider {...props} value={value}>
      {children}
    </SessionProviderContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(SessionProviderContext)

  if (context === undefined)
    throw new Error('useAuth must be used within a SessionProvider')

  return context
}
