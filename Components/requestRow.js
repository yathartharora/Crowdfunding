import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class RequestRow extends Component{



    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({from:accounts[0]});
    };

    onFinalize = async() => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({from:accounts[0]});
    };

    render() {
        const {Row, Cell} = Table;
        const readyToFinalize = this.props.request.approvalCount > this.props.approversCount / 2;

        return (
            <Row disabled={this.props.request.complete} positive={readyToFinalize}>
                <Cell>{this.props.id + 1}</Cell>
                <Cell>{this.props.request.description}</Cell>
                <Cell>{this.props.request.value}</Cell>
                <Cell>{this.props.address}</Cell>
                <Cell>{this.props.request.approvalCount}/{this.props.approversCount}</Cell>
                <Cell>
                    {this.props.request.complete ? null : (
                    <Button color="green" basic onClick={this.onApprove}>Approve</Button>
                    )}
                </Cell>
                <Cell>
                    {this.props.request.complete ? null : (
                    <Button color="teal" basic onClick={this.onFinalize}>Finialize</Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;