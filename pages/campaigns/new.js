import React from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

import Router from 'next/router';


class CamapaignNew extends React.Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }
    onSubmit = (event)  => {   
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        web3.eth.getAccounts().then(accounts => {
            factory.methods.createCampaign(this.state.minimumContribution).send({
                from: accounts[0]
            }).then(() => {
                this.setState({ loading: false });
                Router.push('/');
            }).catch(err => {
                this.setState({ errorMessage: err.message });
                this.setState({ loading: false });
            })
        }).catch(err => {
            this.setState({ errorMessage: err.message });
            this.setState({ loading: false });
        })            
    }

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={ !! this.state.errorMessage }>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei" 
                            labelPosition='right' 
                            value={this.state.minimumContribution}
                            onChange={(event) => {
                                this.setState({ minimumContribution: event.target.value });
                            }}
                        />
                    </Form.Field> 
                    <Message error header="Oops!" content={ this.state.errorMessage } />
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form> 

            </Layout>
        );
    }
}

export default CamapaignNew;