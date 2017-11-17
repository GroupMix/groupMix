import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Card,
    List,
    Container,
    Search,
    Button
} from 'semantic-ui-react'
import { fetchAllUsers, hideUser, postInvitedUser } from '../store'
import UserListItem from './userListItem'
import '../styles/_usersList.scss'

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            search: '',
        }
    }
    componentDidMount() {
        console.log(this.props)
        this.props.fetchInitialData(this.props.newEvent.id)
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ search: value })

    }
    clearAllFilters = () => {
        this.props.fetchInitialData()
        this.setState({ search: '' })
    }
    render() {
        let { users, hideUser, newEvent, inviteUser } = this.props
        let regex = new RegExp(this.state.search, 'i');
        users = users.filter(user => user.name.match(regex))
        return (
            <Container>
                <div className="filteringContainer">
                    <Search
                        showNoResults={false}
                        onSearchChange={this.handleSearchChange}
                        value={this.state.search}
                    />
                    <Button id="clearFilterBttn" onClick={() => this.clearAllFilters()}>Clear Filters</Button>
                </div>
                <List divided relaxed horizontal size="small">
                    {
                        users.length &&
                        users.map(user => {
                            return (
                                <UserListItem key={user.id} user={user} hideUser={hideUser} event={newEvent} inviteUser={inviteUser} />
                            )
                        })
                    }
                </List>
            </Container>
        )
    }
}

const mapState = ({ users, inviteUsers, newEvent }) => {
    return {
        users,
        inviteUsers,
        newEvent
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchInitialData: (eventId) => {
            dispatch(fetchAllUsers())
        },
        hideUser: (userId) => {
            dispatch(hideUser(userId))
        },
        inviteUser: (eventId, userId) => {
            console.log(eventId, userId, 'test')
            dispatch(postInvitedUser(eventId, userId))
        }
    }
}

export default connect(mapState, mapDispatch)(UsersList)
