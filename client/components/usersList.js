import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../store'
import UserListItem from './userListItem'
class UsersList extends Component {
    componentDidMount() {
        this.props.fetchAllUsers()
        console.log('component mounted and fetched')
    }

    render() {
        let { users } = this.props
        console.log(users, 'users in the render function')
        return (
            <div>
                {
                    users.length &&
                    users.map(user => {
                        return (
                           <UserListItem key={user.id} user={user} />
                        )
                    })
                }
            </div>
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
        }
    }
}

export default connect(mapState, mapDispatch)(UsersList)
