import React,  {Component} from 'react';
import Layout from '../../Components/Layout';
import Campaign from '../../ethereum/campaign';
import {Card,Grid, Button} from 'semantic-ui-react';
import Contributeform from '../../Components/Contribute';
import {Link} from '../../routes';

class campaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
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
            minimumContribution,
            requestCount,
            approversCount,
            manager
        } = this.props;


        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'Manager created this Campaign and can request to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: balance,
                meta: 'Balance',
                description: 'Current Balance in the Campaign'
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution in wei',
                description: 'Minimum amount needed as contribution to become a approver'
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'Requests made by the manager for money withdrawl'
            },
            {
                header: approversCount,
                meta: 'Approvers Count',
                description: 'Total number of Approvals'
            }
        ];
        return <Card.Group items={items} />;
    }
    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <Contributeform address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route = {`/campaigns/${this.props.address}/requests`} >
                                <a>
                                    <Button primary>
                                        View Requests
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}


export default campaignShow;