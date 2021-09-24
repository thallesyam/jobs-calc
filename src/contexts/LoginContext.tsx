import { Magic } from 'magic-sdk'
import { useRouter } from 'next/dist/client/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../services/api'

type LoginConxtexProviderProps = {
  children: ReactNode
}

type UserProps = {
  email: string
  name?: string
  image?: string
}

type LoginContextData = {
  user: UserProps
  signIn: (email: string) => void
  getUser: () => void
}

const LoginContext = createContext({} as LoginContextData)

export function LoginContextProvider({ children }: LoginConxtexProviderProps) {
  const [user, setUser] = useState({} as UserProps)
  const router = useRouter()

  async function getUser() {
    const { data } = await api.get('/getUser')

    if (data.user) setUser(data.user)
  }

  useEffect(() => {
    ;(async () => {
      await getUser()
    })()
  }, [])

  async function signIn(email: string) {
    const resolver = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ email })

    const { data } = await api.post(
      '/login',
      {},
      {
        headers: { Authorization: `Bearer ${resolver}` },
      }
    )

    if (data.user) {
      setUser(data.user)
    }
  }

  return (
    <LoginContext.Provider value={{ user, signIn, getUser }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => useContext(LoginContext)
