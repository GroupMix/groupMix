import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Card,
    List,
    Container,
    Search,
    Button,
    Header
} from 'semantic-ui-react'
import {
    fetchAllUsers,
    hideUser,
    postInvitedUser,
    fetchInvitedUsers,
    removeUserInvite,
    fetchEvent
} from '../store'
import UserListItem from './userListItem'
import '../styles/_usersList.scss'
import socket from '../socket'

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            userEvent: {},
            filterInvited: false,
            filteruninvited: false
        }
    }
    componentDidMount() {
        this.props.fetchInitialData()
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ search: value })

    }
    clearAllFilters = () => {
        this.props.fetchInitialData()
        this.setState({ search: '', filterInvited: false })
    }
    render() {
        let { newEvent, currentUser, users, hideUser, inviteUser, invitedUsers, uninviteUser } = this.props
        let eventId = Number(this.props.match.params.eventId)
        let regex = new RegExp(this.state.search, 'i');

        invitedUsers = invitedUsers.filter(user => user.id !== currentUser.id)
        users = users.filter(user => user.id !== currentUser.id)
        users = users.filter(user => user.name.match(regex))
        users = this.state.filterInvited
            ? invitedUsers
            : users
        return (
            <Container className="userInviteContainer">
                {
                    currentUser.id ?
                        <div>
                            <Header as="h2">Invite Your Guests to your "{newEvent.name}" Event</Header>
                            <hr />
                            <div className="filteringContainer">
                                <div className="flexDiv">
                                    <Button id="flatBttn1" onClick={() => this.props.history.push(`/events/${eventId}`)} >Set Preferences</Button>
                                    <Button id="flatBttn2" onClick={() => this.props.history.push(`/events/${eventId}/partyview`)}>Party View</Button>
                                </div>
                                <div className="flexDiv">
                                <Search
                                    showNoResults={false}
                                    onSearchChange={this.handleSearchChange}
                                    value={this.state.search}
                                    id="userSearchBar"
                                />
                                <Button id="invitedFilterBttn" onClick={() => this.setState({ filterInvited: !this.state.filterInvited })} >Invited</Button>
                                <Button id="clearFilterBttn" onClick={() => this.clearAllFilters()}>Clear Filters</Button>
                                </div>
                            </div>
                            <List divided relaxed horizontal size="small">
                                {
                                    users.length ?
                                        users.map(user => {
                                            return (
                                                <UserListItem key={user.id} user={user} hideUser={hideUser} inviteUser={inviteUser} eventId={eventId} uninviteUser={uninviteUser} invitedUsers={invitedUsers} />
                                            )
                                        })
                                        : <h1>No one Has been Invited</h1>
                                }
                            </List>
                        </div>
                        : <h1>Must be a the host to reach this page</h1>
                }
            </Container>
        )
    }
}

const mapState = ({ user, users, invitedUsers, newEvent, eventUsers, event }) => {
    return {
        currentUser: user,
        users,
        invitedUsers,
        newEvent,
        eventUsers,
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        fetchInitialData: () => {
            const eventId = parseInt(ownProps.match.params.eventId, 10)
            dispatch(fetchAllUsers())
            dispatch(fetchInvitedUsers(eventId))
            dispatch(fetchEvent(eventId))
        },
        hideUser: (userId) => {
            dispatch(hideUser(userId))
        },
        inviteUser: (eventId, userId) => {
            socket.emit('userInvite', (userId))
            dispatch(postInvitedUser(eventId, userId))
        },
        uninviteUser: (eventId, userId) => {
            socket.emit('userInvite', (userId))
            dispatch(removeUserInvite(eventId, userId))
        }
    }
}

export default connect(mapState, mapDispatch)(UsersList)
