// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address spender, address recipient, uint256 amount) external returns (bool);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function name() external view returns (string memory);   
}

contract TokenICO {
    address public owner;
    address public tokenAddress;
    uint256 public tokenSalePrice;  // Sale price of tokens in Wei
    uint256 public soldTokens;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    constructor(uint256 _initialTokenSalePrice) {
        owner = msg.sender;
        tokenSalePrice = _initialTokenSalePrice;  // Set the initial token sale price
    }

    function updateToken(address _tokenAddress) public onlyOwner {
        tokenAddress = _tokenAddress;
    }

    function updateTokenSalePrice(uint256 _tokenSalePrice) public onlyOwner {
        tokenSalePrice = _tokenSalePrice;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256) {
        uint256 z = x * y;
        require(y == 0 || z / y == x, "Multiplication overflow");
        return z;
    }

    function buyToken(uint256 _tokenAmount) public payable {
        uint256 requiredEther = multiply(_tokenAmount, tokenSalePrice);
        require(msg.value == requiredEther, "Insufficient Ether provided for the token purchase");

        ERC20 token = ERC20(tokenAddress);
        require(_tokenAmount <= token.balanceOf(address(this)), "Not enough tokens left for sale");

        // Transfer tokens to buyer
        require(token.transfer(msg.sender, _tokenAmount * 1e18), "Token transfer failed");

        // Transfer Ether to owner
        payable(owner).transfer(msg.value);
        soldTokens += _tokenAmount;
    }

    function getTokenDetails() public view returns (
        string memory name, 
        string memory symbol, 
        uint256 balance, 
        uint256 supply, 
        uint256 tokenPriceReturn, 
        address tokenAddr
    ) {
        require(tokenAddress != address(0), "Token address is not set");
        ERC20 token = ERC20(tokenAddress);
        return (
            token.name(),
            token.symbol(),
            token.balanceOf(address(this)),
            token.totalSupply(),
            tokenSalePrice,
            tokenAddress
        );
    }

    function transferToOwner(uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");
        (bool success, ) = owner.call{value: _amount}("");
        require(success, "Transfer to owner failed");
    }

    function transferEther(address payable _receiver, uint256 _amount) external onlyOwner {
        require(address(this).balance >= _amount, "Insufficient contract balance");
        (bool success, ) = _receiver.call{value: _amount}("");
        require(success, "Transfer to receiver failed");
    }

    function withdrawAllTokens() public onlyOwner {
        require(tokenAddress != address(0), "Token address is not set");
        ERC20 token = ERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(token.transfer(owner, balance), "Token transfer failed");
    }
}
