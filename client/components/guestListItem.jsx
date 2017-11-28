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
  let atEvent;
  let status;
  let color;
  if (user.eventUser) {
    user.eventUser.atEvent === true ? atEvent = 'thumbs up' : atEvent = 'thumbs down'
    user.eventUser.atEvent === true ? status = 'At Event' : status = 'Not here yet'
    user.eventUser.atEvent === true ? color = 'green' : color = 'red'
  } else {
    atEvent = 'thumbs down'
    status = 'Not here yet'
    color = 'red'
  }
  return (

    <Card raised={true} color="purple">
      {
        user.imgurPhoto &&
        <Image src={user.imgurPhoto} />
      }
      {
        !user.imgurPhoto &&
        <Icon name="music" size="massive" color="blue" fitted={true} />
      }
      <Card.Content color="purple">
        <Card.Header>{user.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <a color={color}>
          <Icon name={atEvent} color={color} />
          {status}
        </a>
      </Card.Content>
    </Card>
  )
}

export default GuestListItem
