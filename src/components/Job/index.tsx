import { JobTag } from '../JobTag'

import { EditIcon } from '../../../public/assets/icons/EditIcon'
import { DeleteIcon } from '../../../public/assets/icons/DeleteIcon'

export function Job() {
  return (
    <section className="w-full bg-ice900 rounded flex items-center justify-between px-8 py-7 border border-gray500">
      <div className="flex items-center gap-8">
        <p className="text-base	text-gray600 font-ibm font-semibold">1</p>
        <p className="text-2xl text-gray800 font-ibm font-semibold">
          Pizzaria Guloso
        </p>
      </div>

      <div>
        <p className="text-xs	text-gray600 font-inter font-semibold">Prazo</p>
        <p className="text-base text-gray900 font-inter font-semibold">
          3 dias para entrega
        </p>
      </div>

      <div>
        <p className="text-xs	text-gray600 font-inter font-semibold">Valor</p>
        <p className="text-base text-gray900 font-inter font-semibold">
          R$ 4500,00
        </p>
      </div>

      <JobTag isWorking={true} />

      <div className="flex items-center gap-2">
        <button className="border border-gray500 p-2 rounded transition-all hover:opacity-70">
          <EditIcon />
        </button>
        <button className="border border-gray500 p-2 rounded transition-all hover:opacity-70">
          <DeleteIcon />
        </button>
      </div>
    </section>
  )
}
