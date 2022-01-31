import React from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Link from 'next/link';
import Router from 'next/router';
import { withRouter } from 'next/router';
import Layout from '../../../../components/Layout';

class RequestNew extends React.Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        errorMessage: '',
        loading: false
    }

    static async getInitialProps(props) {
        const address = props.query.show;
        // console.log(props.query);
        return { address };
    }

    onSubmit = event => {
        event.preventDefault();
        
        // console.log(this.props.address);

        const campaign = Campaign(this.props.address);

        const { description, value, recipient } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        web3.eth.getAccounts().then(accounts => {
            campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
                from: accounts[0]
            }).then(() => {
                this.setState({ loading: false });
                Router.push(`/campaigns/${this.props.address}/requests`);
            }).catch(err => {
                this.setState({ errorMessage: err.message});
                this.setState({ loading: false });
            })
        }).catch(err => {
            this.setState({ errorMessage: err.message});
            this.setState({ loading: false });
        })

    }

    render() {
        return (
            <Layout>

                <Link href={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        Back
                    </a>
                </Link>

                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!! this.state.errorMessage }>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>

                        <Message error header="Oops!" content={this.state.errorMessage}></Message>

                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        )
    };
}

export default withRouter(RequestNew);