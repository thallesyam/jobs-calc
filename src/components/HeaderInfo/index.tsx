import { Button } from '../Button'

const data = [
  {
    id: 1,
    qtd: 12,
    text: 'Projetos ao total',
  },
  {
    id: 2,
    qtd: 7,
    text: 'Em andamento',
  },
  {
    id: 3,
    qtd: 4,
    text: 'Encerrados',
  },
]

export function HeaderInfo() {
  return (
    <section className="flex justify-between items-center pb-10">
      <div className="flex items-center gap-10">
        {data.map(({ id, qtd, text }) => (
          <div key={id}>
            <h2 className="font-inter text-white font-bold text-2xl">{qtd}</h2>
            <p className="font-inter text-gray900 text-base">{text}</p>
          </div>
        ))}
      </div>
      <Button addPlus color="orange900" size="large">
        adicionar Novo Job
      </Button>
    </section>
  )
}
