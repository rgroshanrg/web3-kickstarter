import React from 'react';
import Layout from '../../../components/Layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import { withRouter } from "next/router";
import Campaign from '../../../ethereum/campaign';
import ContributeForm from '../../../components/ContributeForm';
import web3 from '../../../ethereum/web3';
import Link from 'next/link';

class CampaignShow extends React.Component {

    static async getInitialProps(props) {

        const campaign = Campaign(props.query.show);        // props.query.show provides the url id
        const summary = await campaign.methods.getSummary().call();
        // console.log(summary);
        return {
            address: props.query.show,

            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            approversCount,
            requestCount
        } = this.props;
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The Manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution',
                description: 'You must contribute at least this much wei to become a contributor'
                // style: { overflowWrap: 'break-word' }
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A Request tries to Withdraw money from the Contract'
                // style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                meta: 'Number of Contributors',
                description: 'Number of People alreadt Donated to this Campaign'
                // style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'Current Balance in Campaign'
                // style: { overflowWrap: 'break-word' }
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaigns Show</h3>
                <Grid>
                    
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link href={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default withRouter(CampaignShow);