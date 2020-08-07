pragma solidity ^0.4.25;

contract Factory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Crowdfunding(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedContracts() public view returns(address[]) {
        return deployedCampaigns;
    }
}


contract Crowdfunding {
    
    struct Request {
        string description;
        uint256 value;
        address recepient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
        
    }
    
    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint approversCount;
    
    
    modifier restricted(){
        require(msg.sender==manager);
        _;
    }
    
    
    constructor (uint minimum, address sender) public{
        manager = sender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string d, uint256 v, address r) public restricted{
        Request memory newRequest = Request({
            description: d,
            value: v,
            recepient: r,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint256 index) public{
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
        
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(request.approvalCount > approversCount/2);
        require(!request.complete);
        
        
        request.recepient.transfer(request.value);
        request.complete = true;
        
    }
    
}
