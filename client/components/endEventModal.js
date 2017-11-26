import React, { Component } from "react"
import {
    Segment,
    Card,
    Button,
    Divider,
    Header,
    Modal
} from 'semantic-ui-react'

const EndEventModal = ({endEvent}) => {
    return (
        <Modal.Content>
            <Modal.Content>
                <Header icon="warning sign" content="Are You Sure You want to end the Event?" />
               
                <Divider />
            </Modal.Content>
            <Modal.Content>
                <p> Your Current Top 100 tracks will be saved on your spotify playlist when you end your Event </p>
                <div>
                    <Button icon="battery low" labelPosition="left" content="Yes" color="green" onClick={() => endEvent(true)} />
                    <Button icon="battery high" content="No" labelPosition="left" color="red" onClick={() => endEvent(false)} />
                </div>
            </Modal.Content>
        </Modal.Content>
    )
}

export default EndEventModal
