import { createContext, useState } from 'react'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleModalOpen = (type = 'default') => {
    const typeLowercase = type.toLowerCase()
    switch (typeLowercase) {
      case 'add':
        setModal(!modal)
        setModalType(typeLowercase)
        break
      case 'edit':
        setModal(!modal)
        setModalType(typeLowercase)
        break
      case 'close':
      case 'default':
      default:
        setModal(false)
        setModalType('')
    }
  }

  return (
    <ModalContext.Provider
      value={{
        handleModalOpen,
        modal,
        modalType,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export { ModalProvider }

export default ModalContext
