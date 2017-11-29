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
    <Card color="purple" style={{ backgroundColor: '#939496', height: '20em' }} size="medium" >
    {
      user.imgurPhoto
      ? <Image size ="medium" style={{ height: '14em' }}src={user.imgurPhoto} /> :
      <Image size ="medium" style={{ height: '14em' }}src="/assets/coloredheadphones.jpeg" />
    }
      <Card.Content color="purple" style={{ backgroundColor: '#490450' }}>
        <Card.Header style={{ fontColor: 'white', color: 'white' }}>{user.name}</Card.Header>
      </Card.Content>
      <Card.Content extra style={{ backgroundColor: '#4a474a' }}>
        <Icon name={atEvent} style={{ color: color }} />
        <span style={{ fontColor: 'white', color: 'white' }}> {status} </span>
      </Card.Content>

    </Card>
  )
}

export default GuestListItem
