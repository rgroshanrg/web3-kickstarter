import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

import Router from 'next/router';

class ContributeForm extends Component {
    
    state = {
        value: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' })
        const campaign = Campaign(this.props.address);
        web3.eth.getAccounts().then(accounts => {
            campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            }).then(() => {
                Router.replace(`/campaigns/${this.props.address}`);
                this.setState({ loading: false, value: '' });
            }).catch(err => {
                this.setState({ errorMessage: err.message });
                this.setState({ loading: false, value: '' });
            })
        }).catch(err => {
            this.setState({ errorMessage: err.message });
            this.setState({ loading: false, value: '' });
        })
    }

     render() {

        return (
            <Form onSubmit={this.onSubmit} error={!! this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label="ether"
                        labelPosition='right'
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage}></Message>
                <Button loading={this.state.loading} primary>Contribute</Button>
            </Form>
        )

     }
}

export default ContributeForm;