import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { api } from '../../services/api'

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
  const [jobData, setJobDta] = useState(job)
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [isModalDelete, setIsModalDelete] = useState(false)
  const { handleSubmit } = useForm<any, any>({})

  const { jobname, days, jobValue, isWorking, ref } = jobData
  const jobId = JSON.parse(ref)['@ref'].id

  function handleCloseModal() {
    setIsOpen(false)
  }

  function handleOpenEditModal() {
    setIsOpen(true)
    setIsModalEdit(true)
    setIsModalDelete(false)
  }

  function handleOpenDeleteModal() {
    setIsOpen(true)
    setIsModalDelete(true)
    setIsModalEdit(false)
  }

  async function handleClickEditButton() {
    try {
      await api.post('/editJob', {
        jobId,
      })

      window.location.href = '/home'
      handleCloseModal()
    } catch (err) {
      console.log(err)
    }
  }

  async function handleClickDeleteButton() {
    try {
      await api.post('/deleteJob', {
        jobId,
      })

      window.location.href = '/home'
      handleCloseModal()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className="w-full bg-ice900 rounded flex items-center justify-between px-8 py-7 border border-gray500">
      <div className="flex items-center gap-8">
        <p className="text-base	text-gray600 font-ibm font-semibold">1</p>
        <p className="text-2xl text-gray800 font-ibm font-semibold w-64 truncate">
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
          onClick={handleOpenDeleteModal}
          className="border border-gray500 p-2 rounded transition-all hover:opacity-70"
        >
          <DeleteIcon />
        </button>
      </div>

      {isModalEdit ? (
        <ModalComponent isOpen={isOpen} handleCloseModal={handleCloseModal}>
          <form
            onSubmit={handleSubmit(handleClickEditButton)}
            className="w-full h-full bg-gray400 flex items-center flex-col p-10"
          >
            <div className="mb-8">
              <EditIcon width={'48'} height={'48'} />
            </div>
            <h2 className="text-gray700 font-ibm font-semibold text-3xl mb-2">
              Editar job
            </h2>
            <p className="text-base font-ibm font-medium text-gray900 mb-8">
              Quer mesmo encerrar esse job? <br /> Ele será encerrado pra
              sempre.
            </p>
            <section className="flex gap-2">
              <button
                onClick={handleCloseModal}
                className="w-44 h-12 flex items-center justify-center rounded transition-all hover:opacity-70 bg-gray500 font-ibm font-bold text-sm text-gray900"
              >
                Cancelar
              </button>
              <button className="w-44 h-12 flex items-center justify-center rounded transition-all hover:opacity-70 bg-orange900 font-ibm font-bold text-sm text-white">
                Encerrar o Job
              </button>
            </section>
          </form>
        </ModalComponent>
      ) : (
        <ModalComponent isOpen={isOpen} handleCloseModal={handleCloseModal}>
          <form
            onSubmit={handleSubmit(handleClickDeleteButton)}
            className="w-full h-full bg-gray400 flex items-center flex-col p-10"
          >
            <div className="mb-8">
              <EditIcon width={'48'} height={'48'} />
            </div>
            <h2 className="text-gray700 font-ibm font-semibold text-3xl mb-2">
              Excluir job
            </h2>
            <p className="text-base font-ibm font-medium text-gray900 mb-8">
              Quer mesmo excluir esse job? <br /> Ele será excluido pra sempre.
            </p>
            <section className="flex gap-2">
              <button
                onClick={handleCloseModal}
                className="w-44 h-12 flex items-center justify-center rounded transition-all hover:opacity-70 bg-gray500 font-ibm font-bold text-sm text-gray900"
              >
                Cancelar
              </button>
              <button className="w-44 h-12 flex items-center justify-center rounded transition-all hover:opacity-70 bg-red900 font-ibm font-bold text-sm text-white">
                Excluir o Job
              </button>
            </section>
          </form>
        </ModalComponent>
      )}
    </section>
  )
}
