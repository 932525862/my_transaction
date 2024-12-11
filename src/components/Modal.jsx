  import { Modal } from 'antd'
  import React from 'react'

  const ModalComponent = ({ title, isOpen, onCancel, children, width }) => {
    return (
      <Modal
        title={title}
        open={isOpen}
        footer={false}
        onCancel={onCancel}
        width={width}
      >
        {children}
      </Modal>
    )
  }

  export default ModalComponent