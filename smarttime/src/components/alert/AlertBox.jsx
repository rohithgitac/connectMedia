import React, { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const AlertBox = ({message}) => {

    const [isOpen,setIsOpen] = useState(true)

    const closeModal = ( ) => {
        setIsOpen(false)
    }

  return (
    <Modal isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel='Alert Box'
    >
        <h2>Alert</h2>
        <p>{message}</p>
        <button onClick={closeModal}>Close</button>
    </Modal>
  )
}

export default AlertBox