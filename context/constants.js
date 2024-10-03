import { ethers } from "ethers";
import Web3Modal from "web3modal"; // Corrected import for Web3Modal

// INTERNAL IMPORT
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";
import { Contract } from "ethers";

export const TOKEN_ADDRESS = "0xf38Fd3AB62E4893777aBc20D09DC6Bd0FaA23E9b"; // Consistent naming
export const ERC20_ABI = erc20.abi;
export const OWNER_ADDRESS = "0xFe0B7C77CCA819DD3Ce4268fFAbC8ed42cE5Cd8C";
export const CONTRACT_ADDRESS = "0x7Af3Cb755bd733eF7DD56e1168aB203ddF87f448";
export const CONTRACT_ABI = tokenICO.abi;

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const tokenImage =
  "https://www.daulathussain.com/wp-content/uploads/2024/05/theblockchaincoders.jpg";

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networks[networkName]],
    });
  } catch (error) {
    console.error(error.message); // Changed from console.log to console.error
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "holesky"; // Keep this consistent
  await changeNetwork({ networkName });
};

export const CHECK_WALLET_CONNECTED = async () => {
  if (!window.ethereum) return console.log("Please Install MetaMask");
  await handleNetworkSwitch();
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (accounts.length) {
    return accounts[0];
  } else {
    console.log("Please Install MetaMask & Connect, Reload");
  }
};

export const CONNECT_WALLET = async () => {
  try {
    if (!window.ethereum) return console.log("Please Install MetaMask");

    await handleNetworkSwitch();
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    window.location.reload();

    return accounts[0];
  } catch (error) {
    console.error(error); // Changed from console.log to console.error
  }
};

const fetchContract = (address, abi, signer) =>
  new ethers.Contract(address, abi, signer);

export const TOKEN_ICO_CONTRACT = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); // Corrected from singer to signer

    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return contract;
  } catch (error) {
    console.error(error);
  }
};

export const ERC20 = async (ADDRESS) => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const network = await provider.getNetwork();
    const signer = provider.getSigner(); // Corrected from singer to signer
    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    const userAddress = await signer.getAddress(); // Corrected to await
    const balance = await contract.balanceOf(userAddress);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const supply = await contract.totalSupply(); // Corrected capitalization
    const decimals = await contract.decimals();
    const address = await contract.address; // This is not necessary for the token details

    const token = {
      address: ADDRESS, // Corrected to use the passed address
      name: name,
      symbol: symbol,
      decimals: decimals,
      supply: ethers.utils.formatEther(supply.toString()), // Corrected capitalization
      balance: ethers.utils.formatEther(balance.toString()), // Corrected capitalization
      chainId: network.chainId,
    };
    console.log(token);
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const ERC20_CONTRACT = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); // Corrected from singer to signer
    
    const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, signer);
    return contract;
  } catch (error) {
    console.error(error);
  }
};

export const GET_BALANCE = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); // Corrected from singer to signer

    const balance = await signer.getBalance(); // Corrected to use getBalance
    return ethers.utils.formatEther(balance.toString());
  } catch (error) {
    console.error(error);
  }
};

export const CHECK_ACCOUNT_BALANCE = async (ADDRESS) => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    
    const balance = await provider.getBalance(ADDRESS); // Corrected to use getBalance
    return ethers.utils.formatEther(balance.toString());
  } catch (error) {
    console.error(error);
  }
};

export const addTokenToMetaMask = async () => {
  if (window.ethereum) {
    const tokenDetails = await ERC20(TOKEN_ADDRESS);
    const tokenDecimals = tokenDetails?.decimals;
    const tokenAddress = TOKEN_ADDRESS;
    const tokenSymbol = tokenDetails?.symbol;
    const tokenImage = "";

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
      if (wasAdded) {
        return "Token added";
      } else {
        return "Token not added";
      }
    } catch (error) {
      return "Failed to add";
    }
  } else {
    return "MetaMask is not installed";
  }
};
