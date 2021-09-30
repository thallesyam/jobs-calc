import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

import { Input } from '../components/Input/index'
import { Header } from '../components/Header'

import { useLoginContext } from '../contexts/LoginContext'
import { api } from '../services/api'

import CookieService from '../utils/cookies'

type UserDataProps = {
  name: string
  imageUrl: string
  yieldMonth: number
  hoursDay: number
  daysWeek: number
  vacationWeek: number
}

const schema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  imageUrl: yup.string().required('Link da imagem Obrigatório'),
  yieldMonth: yup.number().required('Valor mensal obrigatório'),
  hoursDay: yup.number().required('Horas diárias Obrigatórias'),
  daysWeek: yup.number().required('Dias semanais Obrigatórios'),
  vacationWeek: yup.number().required('Semanas de férias Obrigatórias'),
})

export default function Profile() {
  const { user } = useLoginContext()
  const toastError = () => toast.error('Ocorreu um erro inesperado')

  const { register, handleSubmit, formState } = useForm<any, UserDataProps>({
    resolver: yupResolver(schema),
  })
  const { errors } = formState

  const handleAddInfoUser: SubmitHandler<UserDataProps> = async (values) => {
    const { name, imageUrl, yieldMonth, hoursDay, daysWeek, vacationWeek } =
      values

    const userData = {
      id: user.ref,
      name,
      imageUrl,
      yieldMonth,
      hoursDay,
      daysWeek,
      vacationWeek,
    }

    try {
      await api.post('/createUserInfo', userData)
    } catch (error) {
      toastError()
    }
  }

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (!document.cookie && !document.cookie.includes('authed')) {
              window.location.href = "/"
            }
          `,
          }}
        />

        <title>{user.name ? user.name : 'Perfil'} | Jobscalc</title>
      </Head>
      <Header prevLink={'/home'} title="Meu perfil" />

      <form
        onSubmit={handleSubmit(handleAddInfoUser)}
        className="w-screen max-w-wild mx-auto flex items-center gap-28 h-screen max-h-heightMain"
      >
        <section className="bg-white px-16 py-16 flex flex-col items-center justify-center text-center rounded border border-gray600 h-screen max-h-profilebox">
          <div className="w-40 h-40 bg-gradient-to-r from-gray700 to-gray800 rounded-full border-2 border-orange900 flex items-center justify-center mb-6">
            {user.image ? (
              <Image
                className="rounded-full"
                width="160"
                height="160"
                alt="Name"
                src={user.image}
              />
            ) : (
              <p className="text-white text-3xl ma0 font-inter font-semibold">
                {user.email?.charAt(0).toUpperCase()}
              </p>
            )}
          </div>

          <h3 className="text-2xl text-gray700 font-ibm font-semibold mb-16">
            {user.name ? user.name : user.email}
          </h3>

          <p className="text-lg text-gray700 font-inter font-normal mb-6">
            O valor da sua hora é{' '}
            <span className="block font-bold">
              {user.valueHour && `${user.valueHour} reais`}
            </span>
          </p>

          <button className="w-48 h-12 bg-green900 rounded text-ice900 text-sm uppercase font-ibm font-bold transition-all hover:opacity-70">
            Salvar dados
          </button>
        </section>

        <section className="w-full">
          <h3 className="text-3xl text-gray700 font-ibm font-semibold mb-4">
            Dados do perfil
          </h3>

          <div className="w-full border border-gray500 mb-8" />

          <section className="flex items-center gap-6 mb-14">
            <Input
              defaultValue={user.name ? user.name : ''}
              error={errors.name?.message}
              yupRef={register('name')}
              placeholder="Nome"
            />
            <Input
              defaultValue={user.image ? user.image : ''}
              error={errors.imageUrl?.message}
              yupRef={register('imageUrl')}
              placeholder="Link da foto"
            />
          </section>

          <h3 className="text-3xl text-gray700 font-ibm font-semibold mb-4">
            Planejamento
          </h3>

          <div className="w-full border border-gray500 mb-8" />

          <section className="flex items-center gap-6">
            <Input
              defaultValue={user.yieldMonth ? user.yieldMonth : ''}
              error={errors.yieldMonth?.message}
              yupRef={register('yieldMonth')}
              placeholder="R$"
            >
              Quanto eu <br /> quero ganhar por mês?
            </Input>
            <Input
              defaultValue={user.hoursDay ? user.hoursDay : ''}
              error={errors.hoursDay?.message}
              yupRef={register('hoursDay')}
            >
              Quantas horas <br /> quero trabalhar por dia?
            </Input>
          </section>

          <section className="flex items-center gap-6">
            <Input
              defaultValue={user.daysWeek ? user.daysWeek : ''}
              error={errors.daysWeek?.message}
              yupRef={register('daysWeek')}
            >
              Quantos dias quero <br /> trabalhar por semana?
            </Input>
            <Input
              defaultValue={user.vacationWeek ? user.vacationWeek : ''}
              error={errors.vacationWeek?.message}
              yupRef={register('vacationWeek')}
            >
              Quantas semanas <br /> por ano você quer tirar férias?
            </Input>
          </section>
        </section>
      </form>
      <ToastContainer />
    </>
  )
}
