// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract One2ManyTransfer {
    using ECDSA for bytes32;

    /// @notice A nonce used for replay protection.
    uint256 public nonce;

    /// @notice Represents a single transfer within a batch.
    struct Transfer {
        address to;
        uint256 value;
        bytes data;
    }

    /// @notice Emitted for every individual transfer executed.
    event TransferExecuted(address to);

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

    /**
     * @dev Internal function to execute a single transfer.
     * @param transfer The Transfer struct containing destination, value, and data.
     */
    function execute_transfer(Transfer calldata transfer) internal {
        (bool success,) = transfer.to.call{value: transfer.value}(transfer.data);
        require(success, "Transfer reverted");
        emit TransferExecuted(transfer.to);
    }
}
