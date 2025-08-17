// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract One2ManyTransfer {
    using ECDSA for bytes32;

    /// nonce used for replay protection.
    uint256 public nonce;

    struct Transfer {
        address to;
        uint256 value;
        bytes data;
    }

    event TransferExecuted(address to);

    constructor() { nonce = 0; }

    function get_nonce() external view returns (uint256) {
        return nonce;
    }

    function set_nonce(uint256 _nonce) external {
        require(msg.sender == address(this), "Access denied");
        nonce = _nonce;
    }

    function execute_batch_transfer(
        Transfer[] calldata transfers,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        bytes32 digest = keccak256(abi.encode(transfers));
        address from = ECDSA.recover(digest, v, r, s);
        require(from == address(this), "Invalid signature");
        nonce++; // Increment nonce to protect against replay attacks
        for (uint256 i = 0; i < transfers.length; i++) {
            execute_transfer(transfers[i]);
        }
    }

    function execute_transfer(Transfer calldata transfer) internal {
        (bool success,) = transfer.to.call{value: transfer.value}(transfer.data);
        require(success, "Transfer reverted");
        emit TransferExecuted(transfer.to);
    }
}
