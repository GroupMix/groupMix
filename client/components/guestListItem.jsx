import React, { Component } from 'react'
import {
  List,
  Container,
  Image,
  Button,
  Card,
  Icon
} from 'semantic-ui-react'
import '../styles/_guestListItem.scss'
const GuestListItem = ({ user, eventId }) => {
  let atEvent;
  let status;
  let color;
  if (user.eventUser) {
    user.eventUser.atEvent === true ? atEvent = 'thumbs up' : atEvent = 'thumbs down'
    user.eventUser.atEvent === true ? status = 'At Event' : status = 'Not here yet'
    user.eventUser.atEvent === true ? color = '#6F8CD9' : color = '#A3568D'
  } else {
    atEvent = 'thumbs down'
    status = 'Not here yet'
    color = '#a3568d'
  }
  return (
        <List.Item color="black" fluid={true} id="guestListItem">
          <img src={user.imgurPhoto} alt={`${user.name}'s Photo`} />
          <Card.Content color="purple">
            <Card.Header id="guestHeader">{user.name}</Card.Header>
          </Card.Content>
          <Card.Content extra>
              <Icon name={atEvent} style={{color: color}} />
              <p style={{color: '#E9E9E9', display: 'inline'}} >{status}</p>
          </Card.Content>
          <hr/>
        </List.Item>
  )
}

export default GuestListItem
