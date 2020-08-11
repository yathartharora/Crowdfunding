import React,{Component } from 'react';
import {Card} from 'semantic-ui-react';
import Layout from '../../Components/Layout';

class About extends Component {

    renderCards() {
        const items = [
            {
                header: 'Manager',
                meta: 'Campaign manager',
                description: 'The Campaign manager manages the transaction of the campaign. Only the Manager has the access to request the Raised Ether.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: 'Approver',
                meta: 'Investor',
                description: 'A Person has to contribute a minimum amount of Wei to become an approver. Approver has the power to approve a money transfer request initiated by the Manager',
            },
            {
                header: 'Yatharth Arora',
                meta: 'Project Developer',
                description: 'You can drop an email at yathartharora1999@gmail.com for further queries or reach me at my Twitter handle: @YatharthArora8 ',
            },
            {
                header: 'Tools and Libraries',
                meta: '',
                description: 'The Frontend has been developed using Next.js and the smart contract has been written in Solidity. Further the Project makes use of MetaMask and runs on Ropsten Network'
            },
            {
                header: 'Version',
                meta: 'This may not be important to you',
                description: '{web3: 1.0.0-beta.26} , {next:^4.1.4} , {react: 16.3.1} , {Solidity:^0.4.25} , {ganache-cli:^6.1.1} , {mocha:^^8.1.1}'
            }
        ];
        return <Card.Group items={items} />;
    }


    render(){
        return(
            <Layout>
                {this.renderCards()}
            </Layout>
        );
    }
}

export default About; 
