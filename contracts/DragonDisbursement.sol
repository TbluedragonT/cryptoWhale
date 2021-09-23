// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

abstract contract Callee {
  function awardFree(address minter, uint256 count) external virtual returns (uint256);
}

contract DragonsDisbursement is Ownable {
  address public dragonsAddress;
  
  function setDragonsAddress(address newAddr) public onlyOwner {
      dragonsAddress = newAddr;
  }
  
  function runDisbursement(address[] calldata to, uint256[] calldata counts, uint256 start, uint256 end) onlyOwner public {
    require(to.length == counts.length, "Bad length");
    require(start <= end, "Bad input");
    
    Callee c = Callee(dragonsAddress);
    
    for (uint256 i = start; i <= end; i++) {
        c.awardFree(to[i], counts[i]);
    }
  }
}
