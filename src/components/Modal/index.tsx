import { ReactNode } from 'react'
import Modal from 'react-modal'

type ModalProps = {
  isOpen: boolean
  handleCloseModal: () => void
  children: ReactNode
}

export function ModalComponent({
  isOpen,
  handleCloseModal,
  children,
}: ModalProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
      {children}
    </Modal>
  )
}
