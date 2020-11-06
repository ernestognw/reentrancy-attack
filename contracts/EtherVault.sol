pragma solidity 0.5.0;

contract EtherVault {
    mapping(address => uint256) public balance;
    
    function withdraw(uint toWithdraw) public payable {
        require(toWithdraw < balance[msg.sender]);
        msg.sender.call.value(toWithdraw)("");
        balance[msg.sender] -= toWithdraw;
    }
    
    function() external payable {
        balance[msg.sender] += msg.value;
    }
}