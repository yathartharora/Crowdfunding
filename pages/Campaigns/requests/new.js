import React, {Component} from 'react';
import Layout from '../../../Components/Layout';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Router, Link} from '../../../routes';

class NewRequest extends Component {

    state = {
        value: '',
        description: '',
        recepient: '',
        loading: false,
        errorMessage: ''
    };

    static async getInitialProps(props) {
        const {address} = props.query;

        return {address};
    };

    onSubmit = async event => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);

        {this.setState({loading: true, errorMessage: ''})}

        const {description, value, recepient} = this.state;

        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await campaign.methods.createRequest(description, value, recepient).send({
              from: accounts[0]  
            });
        } catch (error) {
            this.setState({errorMessage: error.message});
        }
        this.setState({loading: false});
    };


    render() {
        return (
            <Layout>
                <h3>Create Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value = {this.state.description} 
                            onChange = {event  => this.setState({description: event.target.value})}
                        />

                    </Form.Field>

                    <Form.Field>
                        <label>Amount in Wei</label>
                        <Input 
                            value={this.state.value} 
                            onChange = {event  => this.setState({value: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recepient</label>
                        <Input 
                            value={this.state.recepient} 
                            onChange = {event  => this.setState({recepient: event.target.value})}
                        />
                    </Form.Field>
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        );
    }
    
}

export default NewRequest;