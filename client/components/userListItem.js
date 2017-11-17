import React, { Component } from 'react'
import {
    List,
    Container,
    Image,
    Button
} from 'semantic-ui-react'
import '../styles/_usersList.scss'

const UserListItem = ({ user, hideUser }) => {
    return (
        <List.Item>
            <List.Content>
                <div id="userName">
                    <h2>{user.name}</h2>
                    <Image size="small" src={user.imgurPhoto} alt={`${user.name}'s Photo`} />
                </div>
                <div className="ui three buttons">
                    <Button.Group>
                        <Button onClick={() => hideUser(user.id)}>Hide</Button>
                        <Button.Or />
                        <Button id="inviteBttn">Invite</Button>
                    </Button.Group>
                </div>
            </List.Content>
        </List.Item>
    )
}

export default UserListItem
