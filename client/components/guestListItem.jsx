import React, { Component } from 'react'
import {
  List,
  Container,
  Image,
  Button,
  Card,
  Icon
} from 'semantic-ui-react'
import '../styles/_usersList.scss'

const GuestListItem = ({ user, eventId }) => {
  let attending;
  let status;
  let color;
  if(user.eventUser) {
    user.eventUser.isAttending === true ? attending = 'thumbs up' : attending = 'thumbs down'
    user.eventUser.isAttending === true ? status = 'Attending' : status = 'Currently Not Attending'
    user.eventUser.isAttending === true ? color = 'green' : color = 'red'
  } else {
    attending = 'thumbs down'
    status = 'Currently not attending'
    color = 'red'
  }
  return (

        <Card raised = {true }color="purple">
          <Image src={user.imgurPhoto} alt={`${user.name}'s Photo`} />
          <Card.Content color="purple">
            <Card.Header>{user.name}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <a color={color}>
              <Icon name={attending} color={color} />
              {status}
              </a>
          </Card.Content>
        </Card>
  )
}

export default GuestListItem
