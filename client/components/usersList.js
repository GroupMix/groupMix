import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Card,
    List,
    Container,
    Search
} from 'semantic-ui-react'
import { fetchAllUsers, hideUser } from '../store'
import UserListItem from './userListItem'

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.props.fetchAllUsers()
        this.setState(this.props.users)
    }
    handleSearchChange = (e, { value }) => {
        console.log(value)
    }
    render() {
        let { users, hideUser } = this.props
        return (
            <Container>
                <Search
                    showNoResults={false}
                    onSearchChange={this.handleSearchChange}
                />
                <List divided relaxed horizontal size="small">
                    {
                        users.length &&
                        users.map(user => {
                            return (
                                <UserListItem key={user.id} user={user} hideUser={hideUser} />
                            )
                        })
                    }
                </List>
            </Container>
        )
    }
}

const mapState = ({ users }) => {
    return {
        users
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchAllUsers: () => {
            dispatch(fetchAllUsers())
        },
        hideUser: (userId) => {
            dispatch(hideUser(userId))
        }
    }
}

export default connect(mapState, mapDispatch)(UsersList)
