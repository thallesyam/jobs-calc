import { useState } from 'react'

import { JobItemProps } from '../../pages/home'

import { ModalComponent } from '../Modal'
import { JobTag } from '../JobTag'

import { EditIcon } from '../../../public/assets/icons/EditIcon'
import { DeleteIcon } from '../../../public/assets/icons/DeleteIcon'

type JobProps = {
  job: JobItemProps
}

export function Job({ job }: JobProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [isModalDelete, setIsModalDelete] = useState(false)

  const { jobname, days, jobValue, isWorking } = job

  function handleCloseModal() {
    setIsOpen(false)
  }

  function handleOpenEditModal() {
    setIsOpen(true)
    setIsModalEdit(true)
    setIsModalDelete(false)
  }

  function handleOpenCloseModal() {
    setIsOpen(true)
    setIsModalDelete(true)
    setIsModalEdit(false)
  }

  return (
    <section className="w-full bg-ice900 rounded flex items-center justify-between px-8 py-7 border border-gray500">
      <div className="flex items-center gap-8">
        <p className="text-base	text-gray600 font-ibm font-semibold">1</p>
        <p className="text-2xl text-gray800 font-ibm font-semibold">
          {jobname}
        </p>
      </div>

      <div>
        <p className="text-xs	text-gray600 font-inter font-semibold">Prazo</p>
        <p className="text-base text-gray900 font-inter font-semibold">
          {days > 1 ? `${days} dias para entrega` : `${days} dia para entrega`}
        </p>
      </div>

      <div>
        <p className="text-xs	text-gray600 font-inter font-semibold">Valor</p>
        <p className="text-base text-gray900 font-inter font-semibold">
          {jobValue}
        </p>
      </div>

      <JobTag isWorking={isWorking} />

      <div className="flex items-center gap-2">
        <button
          onClick={handleOpenEditModal}
          className="border border-gray500 p-2 rounded transition-all hover:opacity-70"
        >
          <EditIcon />
        </button>
        <button
          onClick={handleOpenCloseModal}
          className="border border-gray500 p-2 rounded transition-all hover:opacity-70"
        >
          <DeleteIcon />
        </button>
      </div>

      <ModalComponent isOpen={isOpen} handleCloseModal={handleCloseModal}>
        Thalles
      </ModalComponent>
    </section>
  )
}
