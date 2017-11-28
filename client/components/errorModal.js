import React, { Component } from 'react'
import {
    Modal,
    Button,
    Divider,
    Segment,
    Header,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { errorState } from '../store'

const ErrorModal = (props) => {
    const { error, clearError } = props
    const showModal = error.message ? true : false
    return (
        <Modal open={showModal}>
            <Modal.Content>
                <Header as="h2"content={`Ooops ...`} />
                <hr/>
                <h3>{error.message}</h3>
                <Button onClick={() => clearError()} style={{backgroundColor: '#6A8CDF', color: 'white'}}>OK</Button>
            </Modal.Content>
        </Modal>
    )
}


const mapState = ({ error }) => ({
    error
})

const mapDispatch = dispatch => ({
    clearError() {
        dispatch(errorState({}))
    }
})

export default connect(mapState, mapDispatch)(ErrorModal)
