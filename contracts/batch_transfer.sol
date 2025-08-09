// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract BatchCallAndSponsor {
    using ECDSA for bytes32;

    /// @notice A nonce used for replay protection.
    uint256 public nonce;

    /// @notice Represents a single call within a batch.
    struct Call {
        address to;
        uint256 value;
        bytes data;
    }

    /// @notice Emitted for every individual call executed.
    event CallExecuted(address called_contract);
    /// @notice Emitted when a full batch is executed.
    event BatchExecuted(uint256 indexed nonce, Call[] calls);
    event FunctionInvoked();

    function execute(
        Call[] calldata calls,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external payable {
        bytes memory stream = abi.encode(calls);
        bytes32 digest = keccak256(stream);
        address from = ECDSA.recover(digest, v, r, s);
        require(from == address(this), "Invalid signature");
        _executeBatch(calls);
    }

    /**
     * @notice Executes a batch of calls directly.
     * @dev This function is intended for use when the smart account itself (i.e. address(this))
     * calls the contract. It checks that msg.sender is the contract itself.
     * @param calls An array of Call structs containing destination, ETH value, and calldata.
     */
    function execute(Call[] calldata calls) external payable {
        require(msg.sender == address(this), "Invalid authority");
        _executeBatch(calls);
    }

    /**
     * @dev Internal function that handles batch execution and nonce incrementation.
     * @param calls An array of Call structs.
     */
    function _executeBatch(Call[] calldata calls) internal {
        for (uint256 i = 0; i < calls.length; i++) {
            _executeCall(calls[i]);
        }

        emit BatchExecuted(currentNonce, calls);
    }

    /**
     * @dev Internal function to execute a single call.
     * @param callItem The Call struct containing destination, value, and calldata.
     */
    function _executeCall(Call calldata callItem) internal {
        (bool success,) = callItem.to.call{value: callItem.value}(callItem.data);
        require(success, "Call reverted");
        emit CallExecuted(callItem.to);
    }

    // Allow the contract to receive ETH (e.g. from DEX swaps or other transfers).
    fallback() external payable {}
    receive() external payable {}
}
