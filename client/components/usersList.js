import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Card,
    List,
    Container,
    Search,
    Button
} from 'semantic-ui-react'
import { fetchAllUsers, hideUser } from '../store'
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
        this.props.fetchAllUsers()
    }

    handleSearchChange = (e, { value }) => {
        this.setState({search: value})
        
    }
    clearAllFilters() {
        this.props.fetchAllUsers()
        this.setState({ search: '' })
    }
    render() {
        let { users, hideUser } = this.props
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
        },
    }
}

export default connect(mapState, mapDispatch)(UsersList)
