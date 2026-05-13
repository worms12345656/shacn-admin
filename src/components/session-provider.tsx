import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type User = {
  name: string
  email?: string
  avatarUrl?: string
  jwt: string
  purpose?: string | null
}

type SessionProviderProps = {
  children: ReactNode
}

type SessionProviderState = {
  auth: User
  setAuth: (auth: User) => void
}

const initialState: SessionProviderState = {
  auth: {
    jwt: '',
    name: '',
    purpose: '',
  },
  setAuth: () => null,
}

const SessionProviderContext = createContext<SessionProviderState>(initialState)

export function SessionProvider({ children, ...props }: SessionProviderProps) {
  const [auth, setAuth] = useState<User>(initialState.auth)

  // Load auth from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      try {
        setAuth(JSON.parse(savedAuth))
      } catch (error) {
        console.error('Failed to parse saved auth:', error)
      }
    }
  }, [])

  // Save auth to localStorage whenever it changes
  useEffect(() => {
    if (auth.jwt) {
      localStorage.setItem('auth', JSON.stringify(auth))
    }
  }, [auth])

  const value = {
    auth,
    setAuth: (auth: User) => {
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
