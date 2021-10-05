import { useRouter } from 'next/dist/client/router'
import { Button } from '../Button'

type CountJobsProps = {
  allJobs: number
  workingJobs: number
  notWorkingJobs: number
}

type HeaderInfoProps = {
  countJobs: CountJobsProps
}

export function HeaderInfo({ countJobs }: HeaderInfoProps) {
  const router = useRouter()

  const data = [
    {
      id: 1,
      qtd: countJobs.allJobs,
      text: countJobs.allJobs > 1 ? 'Projetos ao total' : 'Projeto ao total',
    },
    {
      id: 2,
      qtd: countJobs.workingJobs,
      text: 'Em andamento',
    },
    {
      id: 3,
      qtd: countJobs.notWorkingJobs,
      text: countJobs.notWorkingJobs > 1 ? 'Encerrados' : 'Encerrado',
    },
  ]

  function handleClickNewJob() {
    router.push('/newjob')
  }

  return (
    <section className="flex justify-between items-center pb-10 sm:flex-col sm:justify-center">
      <div className="flex items-center gap-10 sm:mb-6">
        {data.map(({ id, qtd, text }) => (
          <div key={id}>
            <h2 className="font-inter text-white font-bold text-2xl">{qtd}</h2>
            <p className="font-inter text-gray900 text-base sm:text-xs">
              {text}
            </p>
          </div>
        ))}
      </div>
      <Button
        handleClick={handleClickNewJob}
        addPlus
        color="orange900"
        size="large"
      >
        adicionar Novo Job
      </Button>
    </section>
  )
}
