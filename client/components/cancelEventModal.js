import React from "react"
import {
  Button,
  Divider,
  Header,
  Modal
} from 'semantic-ui-react'

const CancelEventModal = (props) => {
  const { cancelEvent, eventId, userId, closeModal } = props
  return (
    <Modal.Content>
      <Header icon="warning sign" content="Are you sure you want to cancel this event?" />
      <Divider />
      <p>You won't be able to undo this action!</p>
      <Button content="Yes" color="green" onClick={() => cancelEvent(eventId, userId)} />
      <Button content="No" color="red" onClick={() => closeModal()} />
    </Modal.Content>
  )
}

export default CancelEventModal
