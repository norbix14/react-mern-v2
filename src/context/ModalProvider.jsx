import { createContext, useState } from 'react'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false)
  const [modalTaskAdd, setModalTaskAdd] = useState(false)

  const handleModalOpen = ({ type = 'modal_default' }) => {
    switch (type.toLowerCase()) {
      case 'modal_task_add':
        setModalTaskAdd(!modalTaskAdd)
        break
      case 'modal_default':
      default:
        setModal(!modal)
    }
  }

  return (
    <ModalContext.Provider
      value={{
        handleModalOpen,
        modal,
        modalTaskAdd,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export { ModalProvider }

export default ModalContext
