import { useEffect, useState } from 'react'
import Head from 'next/head'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

import { Input } from '../components/Input/index'
import { Header } from '../components/Header'

import { api } from '../services/api'
import { useLoginContext } from '../contexts/LoginContext'

import { MoneyOffIcon } from '../../public/assets/icons/MoneyOffIcon'
import { DeleteIcon } from '../../public/assets/icons/DeleteIcon'
import { MoneyOnIcon } from '../../public/assets/icons/MoneyOnIcon'

type JobDataProps = {
  userId: {
    '@ref': {
      id: number
    }
  }
  jobname: string
  hoursDayjob: number
  allhourJob: number
  jobValue: number
}

const schema = yup.object({
  jobname: yup.string().required('Trabalho obrigatório'),
  hoursDayjob: yup
    .number()
    .required('Horas por dia Obrigatório')
    .typeError('Horas por dia Obrigatório'),
  allhourJob: yup
    .number()
    .required('Tempo geral obrigatório')
    .typeError('Tempo geral obrigatório'),
})

export default function NewJob() {
  const toastError = () => toast.error('Ocorreu um erro inesperado')

  const { user } = useLoginContext()
  const [isNotEmptyValue, setIsNotEmptyValue] = useState(false)
  const hourValue = user.yieldMonth / (user.daysWeek * user.hoursDay)

  const { register, handleSubmit, formState, watch, reset } = useForm<
    any,
    JobDataProps
  >({
    resolver: yupResolver(schema),
  })
  const { jobname, hoursDayjob, allhourJob } = watch()
  const { errors } = formState

  const formatedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(allhourJob) * Number(hourValue))

  const handleCreatejob: SubmitHandler<JobDataProps> = async (values) => {
    const { jobname, hoursDayjob, allhourJob } = values

    const data = {
      userId: user.ref['@ref'].id,
      jobname,
      jobValue: hourValue * allhourJob,
      hoursDayjob,
      allhourJob,
    }

    try {
      await api.post('/createJob', data)
    } catch (error) {
      toastError()
    }
  }

  function handleClickClean() {
    reset()
  }

  useEffect(() => {
    if (
      !!jobname !== false &&
      !!hoursDayjob !== false &&
      !!allhourJob !== false
    ) {
      setIsNotEmptyValue(true)
    }
  }, [jobname, hoursDayjob, allhourJob])

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

        <title>Novo job | Jobscalc</title>
      </Head>
      <Header prevLink={'/home'} title="Meu perfil" />

      <form
        onSubmit={handleSubmit(handleCreatejob)}
        className="w-screen max-w-wild mx-auto flex gap-28 mt-16"
      >
        <section className="w-full">
          <h3 className="text-3xl text-gray700 font-ibm font-semibold mb-4">
            Dados do Job
          </h3>

          <div className="w-full border border-gray500 mb-8" />

          <section className="gap-6 mb-6 ">
            <Input
              size="large"
              error={errors.jobname?.message}
              yupRef={register('jobname')}
            >
              Nome do Job
            </Input>
          </section>

          <section className="flex items-center gap-6">
            <Input
              error={errors.hoursDayjob?.message}
              yupRef={register('hoursDayjob')}
            >
              Quantas horas <br /> por dia vai dedicar ao Job?
            </Input>
            <Input
              error={errors.allhourJob?.message}
              yupRef={register('allhourJob')}
            >
              Estimativa de <br /> horas para esse job
            </Input>
          </section>
        </section>

        <section className="bg-white px-16 flex flex-col items-center justify-center text-center rounded border border-gray600 ">
          {isNotEmptyValue ? (
            <>
              <MoneyOnIcon />
              <h3 className="font-inter font-normal text-gray700 mt-6 ">
                O valor do projeto ficou em
              </h3>
              <p className="font-inter font-semibold mb-11 text-gray700">
                {formatedValue} reais
              </p>
            </>
          ) : (
            <>
              <MoneyOffIcon />
              <h3 className="font-inter font-normal text-gray700 mt-6 mb-11">
                Preencha os dados ao lado para ver o valor do projeto
              </h3>
            </>
          )}

          <div className="flex items-center gap-2">
            <button className="w-48 h-12 bg-green900 rounded text-ice900 text-sm uppercase font-ibm font-bold transition-all hover:opacity-70">
              Salvar dados
            </button>
            <button
              onClick={handleClickClean}
              className="border border-gray500 p-2 rounded transition-all hover:opacity-70 bg-gray500"
            >
              <DeleteIcon />
            </button>
          </div>
        </section>
      </form>
      <ToastContainer />
    </>
  )
}
