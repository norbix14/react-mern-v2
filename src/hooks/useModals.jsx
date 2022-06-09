import { useContext } from 'react'

import ModalContext from '../context/ModalProvider'

const useModals = () => {
  return useContext(ModalContext)
}

export default useModals
