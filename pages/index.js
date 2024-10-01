import React, { useState, useEffect, useContext } from "react";
import {
  Footer,
  Header,
  About,
  Brand,
  Contact,
  Faq,
  Features,
  Hero,
  Loader,
  Progress,
  SideBar,
  Team,
  Token,
  TokenInfo,
  Roadmap,
  Popup,
  TransferToken,
  TransferCurrency,
  Owner,
  Donate,
  UpdateAddress,
  UpdatePrice,
} from "../Components/index";
import { TOKEN_ICO_Context } from "../context/index";
import { shortenAddress } from "../Utils/index";
import { CHECK_ACCOUNT_BALANCE, CONNECT_WALLET, ERC20, TOKEN_ADDRESS } from "../context/constants";
// Removed unused import: getAccountPath from "ethers"

const Index = () => {
  const {
    setAccount,
    setLoader,
    currency,
    addTokenToMetaMask,
    Footer,
    Header,
    About,
    Brand,
    Contact,
    Faq,
    Features,
    Hero,
    Loader,
    Progress,
    SideBar,
    Team,
    Token,
    TokenInfo,
    Roadmap,
    Popup,
    TransferToken,
    TransferCurrency,
    Owner,
    Donate,
    UpdateAddress,
    UpdatePrice,
  } = useContext(TOKEN_ICO_Context);

  // Corrected useState syntax and naming conventions
  const [ownerModel, setOwnerModel] = useState(false);
  const [buyModel, setBuyModel] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [transferCurrency, setTransferCurrency] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  //const [account,setAccount] = useState(false);
  const [detail, setDetail] = useState(null); // Initialized as null

  // Ensure 'account' is defined or obtained from context/state
  const { account, TOKEN_ICO } = useContext(TOKEN_ICO_Context); // Example

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await TOKEN_ICO(); // Ensure TOKEN_ICO is defined and an async function
        console.log(items);
        setDetail(items);
      } catch (error) {
        console.error("Error fetching TOKEN_ICO data:", error);
      }
    };
  
    // Check if 'account' exists before fetching data
    if (account) {
      fetchData();
    }
  }, [account, TOKEN_ICO]); // Ensure TOKEN_ICO is included in the dependency array
  

  return <>
  <div className="body_wrap">
{
ownerModel && <Owner 
setOwnerModel={setOwnerModel}
currency={currency}
detail={detail}
account={account}
setTransferModal={setTransferModal}
setTransferCurrency={setTransferCurrency}
setOpenDonate={setOpenDonate}
TOKEN_WITHDRAW={TOKEN_WITHDRAW}
setOpenUpdatePrice={setOpenUpdatePrice}
setOpenUpdateAddress={setOpenUpdateAddress}
/>


}
{
buyModel && (
<Popup setBuyModel=
{setBuyModel} BUY_TOKEN={BUY_TOKEN}
currency={currency} detail={detail} account={account} ERC20={ERC20} TOKEN_ADDRESS={TOKEN_ADDRESS}
setLoader={setLoader}

/>)}
{
transferModal && (
<TransferToken setTransferModal={setTransferModal}
TRANSFER_TOKEN={TRANSFER_TOKEN} 
ERC20={ERC20}
setLoader={setLoader}

/>)}
{
transferCurrency && (
<transferCurrency setTransferCurrency={setTransferCurrency}
TRANSFER_ETHER={TRANSFER_ETHER}
detail={detail}
currency={currency}
CHECK_ACCOUNT_BALANCE={CHECK_ACCOUNT_BALANCE}
setLoader={setLoader}



/>)}
{
openDonate && (
<Donate    
detail={detail}
currency={currency}
setOpenDonate={setOpenDonate}
DONATE={DONNATE}

/>)}
{
openUpdatePrice && (
  <UpdatePrice
  detail={detail}
  currency={currency}
  setOpenUpdatePrice={setOpenUpdatePrice}
  UPDATE_TOKEN_PRICE={UPDATE_TOKEN_PRICE}
  
  
  />)}
  {
openUpdateAddress && (
<UpdateAddress
detail={detail}
currency={currency}
setOpenUpdateAddress={setOpenUpdateAddress}
UPDATE_TOKEN={UPDATE_TOKEN}
ERC20={ERC20}
setLoader={setLoader}

/>)}

{
Loader && <loader/>


}
<Header
 account={account} CONNECT_WALLET={CONNECT_WALLET}
setAccount={setAccount}
setLoader={setLoader}
setOwnerModel={setOwnerModel}
shortenAddress={shortenAddress}
detail={detail}
currency={currency}
ownerModel={ownerModel}
/>
<SideBar/>
<Hero setBuyModel={setBuyModel}
account={account}
CONNECT_WALLET={CONNECT_WALLET}
setAccount={setAccount}
setLoader={setLoader}
detail={detail}
addTokenToMetaMask={addTokenToMetaMask}

/>
<About/>
<Features/>
<Token/>
<TokenInfo/>
<Team/>
<Faq/>
<Contact/>
<Footer/>


  













































  </div>
  
  </> 


  

  
};

export default Index;
