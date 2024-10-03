import React, { useState, useEffect, useContext } from "react";
import {
  Footer,
  Header,
  About,
  Features,
  Hero,
  Loader, // Ensure this is correctly imported
  SideBar,
  Team,
  Token,
  TokenInfo,
  Faq,
  Contact,
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
    addtokenToMetaMask,
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
    loader,
    account,
  } = useContext(TOKEN_ICO_Context);

  // Modal states
  const [ownerModel, setOwnerModel] = useState(false);
  const [buyModel, setBuyModel] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [transferCurrencyModal, setTransferCurrencyModal] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!account) return; // Exit if no account is connected
      try {
        const items = await TOKEN_ICO();
        console.log(items);
        setDetail(items);
      } catch (error) {
        console.error("Error fetching TOKEN_ICO data:", error);
      }
    };

    fetchData();
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
      {transferCurrencyModal && (
        <TransferCurrency
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
          DONATE={DONATE}
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
      {loader && <Loader />} {/* Loader component */}

      <Header
        account={account}
        CONNECT_WALLET={CONNECT_WALLET}
        setAccount={setAccount}
        setLoader={setLoader}
        setOwnerModel={setOwnerModel}
        shortenAddress={shortenAddress}
        detail={detail}
        currency={currency}
      />
      <SideBar />
      <Hero
        setBuyModel={setBuyModel}
        account={account}
        CONNECT_WALLET={CONNECT_WALLET}
        setAccount={setAccount}
        setLoader={setLoader}
        detail={detail}
        addTokenToMetaMask={addtokenToMetaMask}
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
