// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TreeNFT is ERC721 {
    // Struct to represent tree details
    struct Tree {
        string image;
        string category;
        uint256 age;
        uint256 carbonCredits;
        int256 latitude;
        int256 longitude;
    }

    // Mapping from token ID to tree details
    mapping(uint256 => Tree) private trees;

    // Event emitted when a new tree NFT is minted
    event TreeMinted(uint256 tokenId, string image, string category, uint256 age, uint256 carbonCredits, int256 latitude, int256 longitude);

    constructor() ERC721("TreeNFT", "TNFT") {}

    // Function to mint a new tree NFT
    function mintTree(
        uint256 tokenId,
        string memory image,
        string memory category,
        uint256 age,
        uint256 carbonCredits,
        int256 latitude,
        int256 longitude
    ) external {
        require(!_exists(tokenId), "Token ID already exists");
        _mint(msg.sender, tokenId);
        trees[tokenId] = Tree(image, category, age, carbonCredits, latitude, longitude);
        emit TreeMinted(tokenId, image, category, age, carbonCredits, latitude, longitude);
    }

    // Function to get tree details by token ID
    function getTree(uint256 tokenId) external view returns (
        string memory image,
        string memory category,
        uint256 age,
        uint256 carbonCredits,
        int256 latitude,
        int256 longitude
    ) {
        require(_exists(tokenId), "Token ID does not exist");
        Tree memory tree = trees[tokenId];
        return (tree.image, tree.category, tree.age, tree.carbonCredits, tree.latitude, tree.longitude);
    }
}
