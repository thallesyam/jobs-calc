import { Magic } from 'magic-sdk'
import nookies from 'nookies'

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
  ref: any
  email: string
  name?: string
  image?: string
  yieldMonth: number
  hoursDay: number
  daysWeek: number
  vacationWeek: number
  valueHour: number
}

type LoginContextData = {
  user: UserProps
  signIn: (email: string) => void
  getUser: () => void
}

const LoginContext = createContext({} as LoginContextData)

export function LoginContextProvider({ children }: LoginConxtexProviderProps) {
  const [user, setUser] = useState({} as UserProps)

  async function getUser() {
    const { data } = await api.get('/getUser')

    if (data.user) {
      setUser(data.user)
    }
  }

  useEffect(() => {
    ;(async () => {
      await getUser()
    })()
  }, [user?.name])

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
      nookies.set(null, 'userId', data.user.ref['@ref'].id, {
        maxAge: 30 * 24 * 60 * 60,
      })

      console.log(data)

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
