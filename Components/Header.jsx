import React, { useState, useEffect } from "react";

const Header = ({
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  setOwnerModal,
  shortenAddress,
  details,
  currency,
  ownerModal,
}) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);

      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    setAccount(accounts[0]);
  };
  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          mehtod: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.log("error message in connectmetamask Header")
        console.log(error.message);
      }
    } else {
      console.log("Metamask is not installed");
    }
  };

  return <header className="site-header header--transparent ico-header">

    <div className="header_main-wrap">
    <div className="container mxw_1640 ">
      
      <div className="header__main ul_li_between">
        <div className="header_left ul_li">
          <div className="header__logo">
            <a href="/">
            <img src="assets/img/logo/logo.svg" alt="help" />
            
            </a>
          </div>

        </div>
        <div className="main-menu__wrap ul_li navbar navbar-expand-xl">
          <nav className="main-menu collapse navbar-collapse">
            <ul>
              <li >
                <a className="active has-mega-menu"
                 href="/">Home</a>
              </li>
              <li >
                    <a className="scrollspy-btn"
                     href="#about">About</a>
                  </li>
                  <li >
                    <a className="scrollspy-btn"
                     href="#roadmap">Roadmap</a>
                  </li>
                  <li >
                    <a className="scrollspy-btn"
                     href="#team">Team</a>
                  </li>
                  <li >
                    <a className="scrollspy-btn"
                    href="#faq">Faq</a>
                  </li>
                  <li >
                    <a className="scrollspy-btn"
                     href="#contact">Contact</a>
                  </li>

                  <li >
                    <a className="scrollspy-btn"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        ownerModal ? setOwnerModal(false) : setOwnerModal(true)
                      }
                    >
                      Tools
                    </a>
                  </li>
            </ul>



          </nav>
        </div>


        <div className="header__action ul_li">
          <div  className="d-xl-none">
            <a className="header__bar hamburger_menu ">
              <div className="header__bar-icon">
                <span/>
                <span/>
                <span/>
                <span/>
                
                
                </div> 
            </a>
          </div>

          {account ? (
            <div className="header__account">
            <a
              onClick={() =>
                navigator.clipboard.writeText(details?.address)
              }
            >
              {shortenAddress(details?.address)}:{""}
              {details?.maticBal?.slice(0, 6)}
              {currency}
            </a>
          </div>
          ):(
            <div className="header__account">
              <a onClick={() => connectMetamask()}>Connect Wallet</a>
            </div>
          )}
        </div>

      </div>
      </div>


    </div>



  </header>;
};

export default Header;