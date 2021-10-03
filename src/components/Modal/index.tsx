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
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="w-screen max-w-modalwidth h-screen max-h-modalheight flex items-center justify-center"
    >
      {children}
    </Modal>
  )
}
