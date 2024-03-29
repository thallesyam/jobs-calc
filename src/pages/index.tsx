import Head from 'next/head'
import Link from 'next/link'
import * as yup from 'yup'
import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

import { useLoginContext } from '../contexts/LoginContext'

import { LoginSection } from '../components/LogoSection'

type LoginUserFormData = {
  email: string
}

const schema = yup.object({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
})

export default function Login() {
  const router = useRouter()
  const { user, signIn } = useLoginContext()
  const toastError = () => toast.error('Ocorreu um erro inesperado')
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState } = useForm<any, LoginUserFormData>(
    {
      resolver: yupResolver(schema),
    }
  )

  const { errors } = formState

  const handleLoginUser: SubmitHandler<LoginUserFormData> = async (values) => {
    setIsLoading(true)

    const { email } = values

    await signIn(email)

    if (user) {
      router.push('/home')
      setIsLoading(false)
    } else {
      toastError()
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (document.cookie && document.cookie.includes('authed')) {
              window.location.href = "/home"
            }
          `,
          }}
        />

        <title>Login | Jobscalc</title>
      </Head>
      <main className="h-screen w-full grid grid-cols-2 sm:block content-center justify-center bg-gray400">
        <LoginSection />

        <section className="h-screen sm:w-full flex flex-col justify-center p-11 w-5/6 mx-auto">
          <h2 className="text-4xl text-gray700 font-semibold font-ibm mb-12">
            Faça Login
          </h2>
          <form onSubmit={handleSubmit(handleLoginUser)} className="w-full">
            <input
              {...register('email')}
              className={`h-14 border border-gray500 p-6 rounded mb-1.5 w-full ${
                errors?.email && 'outline-red'
              }`}
              type="text"
              placeholder="E-mail"
            />
            {errors?.email && (
              <p className="mb-2 mt-0 text-red900">{errors.email?.message}</p>
            )}

            <button
              disabled={isLoading}
              className="bg-orange900 rounded p-3 text-white font-ibm font-semibold text-xl hover:opacity-80 transition duration-500 ease-in-out w-full disabled:cursor-not-allowed	"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-4 border-white"></div>
                </div>
              ) : (
                'Faça o Login'
              )}
            </button>
          </form>
        </section>
      </main>
      <ToastContainer />
    </>
  )
}
