import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class RequestRow extends React.Component {

    onApprove = () => {
        const campaign = Campaign(this.props.address);

        web3.eth.getAccounts().then(accounts => {
            campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            }).then(() => {

            }).catch(err => {

            })
        }).catch(err => {

        })
    }

    onFinalize = () => {
        const campaign = Campaign(this.props.address);

        web3.eth.getAccounts().then(accounts => {
            campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            }).then(() => {

            }).catch(err => {

            })
        }).catch(err => {

        })
    }

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyToFinalize = request.approvalCount > approversCount/2;
        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                { request.complete ? null : (
                    <Cell>
                        <Button basic color='green' onClick={this.onApprove}>Approve</Button>
                    </Cell>
                )}

                { request.complete ? null : (
                    <Cell>
                        <Button basic color='teal' onClick={this.onFinalize}>Finalize</Button>
                    </Cell>
                )}
            </Row>
        )
    }
}

export default RequestRow;