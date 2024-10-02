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
  Loader, // Ensure this is correctly imported
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

const Index = () => {
  const {
    setAccount,
    setLoader,
    currency,
    addtokenToMetaMask, // Note the lowercase 't'
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
    loader, // Destructure loader
    account,
  } = useContext(TOKEN_ICO_Context); // Only destructure what's provided

  const [ownerModel, setOwnerModel] = useState(false);
  const [buyModel, setBuyModel] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [transferCurrencyModal, setTransferCurrencyModal] = useState(false); // Renamed to avoid confusion
  const [openDonate, setOpenDonate] = useState(false);
  const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await TOKEN_ICO();
        console.log(items);
        setDetail(items);
      } catch (error) {
        console.error("Error fetching TOKEN_ICO data:", error);
      }
    };

    if (account) {
      fetchData();
    }
  }, [account, TOKEN_ICO]);

  return (
    <div className="body_wrap">
      {ownerModel && (
        <Owner
          setOwnerModel={setOwnerModel}
          currency={currency}
          detail={detail}
          account={account}
          setTransferModal={setTransferModal}
          setTransferCurrencyModal={setTransferCurrencyModal}
          setOpenDonate={setOpenDonate}
          TOKEN_WITHDRAW={TOKEN_WITHDRAW}
          setOpenUpdatePrice={setOpenUpdatePrice}
          setOpenUpdateAddress={setOpenUpdateAddress}
        />
      )}
      {buyModel && (
        <Popup
          setBuyModel={setBuyModel}
          BUY_TOKEN={BUY_TOKEN}
          currency={currency}
          detail={detail}
          account={account}
          ERC20={ERC20}
          TOKEN_ADDRESS={TOKEN_ADDRESS}
          setLoader={setLoader}
        />
      )}
      {transferModal && (
        <TransferToken
          setTransferModal={setTransferModal}
          TRANSFER_TOKEN={TRANSFER_TOKEN}
          ERC20={ERC20}
          setLoader={setLoader}
        />
      )}
      {transferCurrencyModal && ( // Corrected component name and state
        <TransferCurrency // Corrected component name
          setTransferCurrency={setTransferCurrencyModal}
          TRANSFER_ETHER={TRANSFER_ETHER}
          detail={detail}
          currency={currency}
          CHECK_ACCOUNT_BALANCE={CHECK_ACCOUNT_BALANCE}
          setLoader={setLoader}
        />
      )}
      {openDonate && (
        <Donate
          detail={detail}
          currency={currency}
          setOpenDonate={setOpenDonate}
          DONATE={DONATE} // Fixed typo from 'DONNATE' to 'DONATE'
        />
      )}
      {openUpdatePrice && (
        <UpdatePrice
          detail={detail}
          currency={currency}
          setOpenUpdatePrice={setOpenUpdatePrice}
          UPDATE_TOKEN_PRICE={UPDATE_TOKEN_PRICE}
        />
      )}
      {openUpdateAddress && (
        <UpdateAddress
          detail={detail}
          currency={currency}
          setOpenUpdateAddress={setOpenUpdateAddress}
          UPDATE_TOKEN={UPDATE_TOKEN}
          ERC20={ERC20}
          setLoader={setLoader}
        />
      )}
      {loader && <Loader />} {/* Corrected to use the Loader component */}

      {/* Use imported components directly */}
      <Header
        account={account}
        CONNECT_WALLET={CONNECT_WALLET}
        setAccount={setAccount}
        setLoader={setLoader}
        setOwnerModel={setOwnerModel}
        shortenAddress={shortenAddress}
        detail={detail}
        currency={currency}
        ownerModel={ownerModel}
      />
      <SideBar />
      <Hero
        setBuyModel={setBuyModel}
        account={account}
        CONNECT_WALLET={CONNECT_WALLET}
        setAccount={setAccount}
        setLoader={setLoader}
        detail={detail}
        addTokenToMetaMask={addtokenToMetaMask} // Ensure consistency in naming
      />
      <About />
      <Features />
      <Token />
      <TokenInfo />
      <Team />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
