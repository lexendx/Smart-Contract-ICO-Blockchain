import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import {
  CHECK_WALLET_CONNECTED,
  CONNECT_WALLET,
  GET_BALANCE,
  CHECK_ACCOUNT_BALANCE,
  addTokenToMetaMask,
  TOKEN_ICO_CONTRACT,
  ERC20,
  ERC20_CONTRACT,
  TOKEN_ADDRESS,
} from "./constants";

export const TOKEN_ICO_Context = React.createContext();

export const TOKEN_ICO_Provider = ({ children }) => {
  const DAPP_NAME = "TOKEN ICO DAPP";
  const currency = "ETH";
  const network = "Holesky";

  const [loader, setLoader] = useState(false);
  const [account, setAccount] = useState();
  
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  // ------CONTRACT FUNCTIONS ------

  const TOKEN_ICO = async () => {
    try {
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        setLoader(true);
        setAccount(address);
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();
        const contractOwner = await contract.owner();
        const soldTokens = await contract.soldTokens();

        const ethBal = await GET_BALANCE();

        const token = {
          tokenBal: ethers.utils.formatEther(tokenDetails.balance.toString()),
          name: tokenDetails.name,
          symbol: tokenDetails.symbol,
          supply: ethers.utils.formatEther(tokenDetails.supply.toString()),
          tokenPrice: ethers.utils.formatEther(
            tokenDetails.tokenPrice.toString()
          ),
          tokenAddr: tokenDetails.tokenAddr,
          maticBal: ethBal,
          address: address.toLowerCase(),
        };

        return token; // Returning the token details
      }
    } catch (error) {
      console.error(error);
      notifyError("Error fetching token details");
    } finally {
      setLoader(false);
    }
  };

  const BUY_TOKEN = async (amount) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        setAccount(address);
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();
        const availableToken = ethers.utils.formatEther(
          tokenDetails.balance.toString()
        );

        if (parseFloat(availableToken) > 1) {
          const price = ethers.utils.formatEther(
            tokenDetails.tokenPrice.toString()
          );
          const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

          const transaction = await contract.buyToken(address, {
            value: payAmount,
            gasLimit: ethers.utils.hexlify(8000000),
          });
          await transaction.wait();
          notifySuccess("Transaction completed successfully");
          window.location.reload();
        } else {
          notifyError("Not enough tokens available");
        }
      }
    } catch (error) {
      console.error(error);
      notifyError("Error, please try again later");
    } finally {
      setLoader(false);
    }
  };

  const TOKEN_WITHDRAW = async () => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const tokenDetails = await contract.getTokenDetails();
        const availableToken = ethers.utils.formatEther(
          tokenDetails.balance.toString()
        );

        if (parseFloat(availableToken) > 1) {
          const transaction = await contract.withdrawAllTokens();
          await transaction.wait();
          notifySuccess("Transaction completed successfully");
          window.location.reload();
        } else {
          notifyError("Not enough tokens to withdraw");
        }
      }
    } catch (error) {
      console.error(error);
      notifyError("Error, please try again later");
    } finally {
      setLoader(false);
    }
  };

  const UPDATE_TOKEN = async (_address) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const transaction = await contract.updateToken(_address);
        await transaction.wait();
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      notifyError("Error, please try again later");
    } finally {
      setLoader(false);
    }
  };

  const UPDATE_TOKEN_PRICE = async (price) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");
        const transaction = await contract.updateTokenSalePrice(payAmount);
        await transaction.wait();
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      notifyError("Error, please try again later");
    } finally {
      setLoader(false);
    }
  };

  const DONATE = async (amount) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(amount.toString(), "ether");
        const transaction = await contract.transferToOwner(payAmount, {
          value: payAmount,
          gasLimit: ethers.utils.hexlify(8000000),
        });
        await transaction.wait();
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      notifyError("Error, please try again later");
    } finally {
      setLoader(false);
    }
  };

  const TRANSFER_ETHER = async ({ receiver, amount }) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(amount.toString(), "ether");
        const transaction = await contract.transferEther(receiver, payAmount, {
          value: payAmount,
          gasLimit: ethers.utils.hexlify(8000000),
        });
        await transaction.wait();
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      notifyError("Error, please try again later");
    } finally {
      setLoader(false);
    }
  };

  const TRANSFER_TOKEN = async ({ tokenAddress, sendTo, amount }) => {
    try {
      setLoader(true);
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        const contract = await ERC20_CONTRACT(tokenAddress);
        const payAmount = ethers.utils.parseUnits(amount.toString(), "ether");
        const transaction = await contract.transfer(sendTo, payAmount, {
          gasLimit: ethers.utils.hexlify(8000000),
        });
        await transaction.wait();
        notifySuccess("Transaction completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      notifyError("Error, please try again later");
    } finally {
      setLoader(false);
    }
  };

  return (
    <TOKEN_ICO_Context.Provider
      value={{
        TOKEN_ICO,
        BUY_TOKEN,
        TRANSFER_ETHER,
        DONATE,
        UPDATE_TOKEN,
        UPDATE_TOKEN_PRICE,
        TOKEN_WITHDRAW,
        TRANSFER_TOKEN,
        CONNECT_WALLET,
        ERC20,
        CHECK_ACCOUNT_BALANCE,
        setAccount,
        setLoader,
        addTokenToMetaMask,
        TOKEN_ADDRESS,
        loader,
        account,
        currency,
      }}
    >
      {children}
    </TOKEN_ICO_Context.Provider>
  );
};
