import React from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from "next/router";
import { Button, Table } from'semantic-ui-react';
import Link from 'next/link';
import Campaign from '../../../../ethereum/campaign';

import RequestRow from '../../../../components/RequestRow';

class RequestIndex extends React.Component {

    static async getInitialProps(props) {
        const address = props.query.show;

        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestCount().call();

        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        )

        return { address, requests, requestCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow 
                key={index}
                request={request}
                id={index}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
        })
    }

    render() {

        const { Header, Row, HeaderCell, Body } = Table;

        return ( 
            <Layout> 
                <h3>Requests page </h3>
                <Link href={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated='right' style={{ marginBottom: 10 }}>Add Request</Button>
                    </a>
                </Link>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>

                    <Body>
                        {this.renderRows()} 
                    </Body>
                </Table>

                <div>Found {this.props.requestCount} requests</div>

            </Layout>
        )
    }
}

export default withRouter(RequestIndex);