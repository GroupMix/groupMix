import React, { Component } from 'react'
import {
    List,
    Container,
    Image,
    Button,
    Icon
} from 'semantic-ui-react'
import '../styles/_usersList.scss'

const UserListItem = ({ user, hideUser, eventId, inviteUser, uninviteUser, invitedUsers }) => {
    let invited = invitedUsers.some(invitedUser => invitedUser.id === user.id)
    return (
        <List.Item id="userItem">
            <List.Content>
                <div id="userName">
                    <h2>{user.name}</h2>
                    {
                      user.imgurPhoto
                      ? <Image id="profilePic" size="small" src={user.imgurPhoto} />
                      : <Icon name="music" size="huge" color="blue" />
                    }
                </div>
                <br />
                <div className="ui three buttons">
                    <Button.Group fluid>
                        <Button onClick={() => hideUser(user.id)}>Hide</Button>
                        <Button.Or />
                        {
                            invited
                                ? <Button id="uninviteBttn" onClick={() => uninviteUser(eventId, user.id)}>Uninvite</Button>
                                : <Button id="inviteBttn" onClick={() => inviteUser(eventId, user.id)}>Invite</Button>
                        }
                    </Button.Group>
                </div>
            </List.Content>
        </List.Item>
    )
}

export default UserListItem
