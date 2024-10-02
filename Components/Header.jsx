import React, { useState, useEffect } from "react";
import { shortenAddress } from "../Utils";

const Header = ({
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  setOwnerModel,
  detail,
  currency,
  ownerModel
}) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null);
    }
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.log("MetaMask is not installed");
      // Optionally, you can prompt the user to install MetaMask here
    }
  };

  return (
    <header className="site-header header--transparentico-header">
      <div className="header_main-wrap">
        <div className="container mxw_1640">
          <div className="header__main ul_li_between">
            <div className="header__left ul_li">
              <a href="/">
                <img src="assets/img/logo/logo.svg" alt="Logo" />
              </a>
            </div>
          </div>
          <div className="main-menu__wrap ul_li navbar navbar-expand-xl">
            <nav className="main-menu collapse navbar-collapse">
              <ul>
                <li className="active has-mega-menu">
                  <a href="/">Home</a>
                </li>
                <li className="scrollspy-btn">
                  <a href="#about">About</a>
                </li>
                <li className="active has-mega-menu">
                  <a href="#roadmap">Roadmap</a>
                </li>
                <li className="active has-mega-menu">
                  <a href="#team">Team</a>
                </li>
                <li className="active has-mega-menu">
                  <a href="#faq">Faq</a>
                </li>
                <li className="active has-mega-menu">
                  <a href="#contact">Contact</a>
                </li>
                <li className="active has-mega-menu">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => setOwnerModel(!ownerModel)}
                  >
                    Tools
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header__action ul_li">
            <div className="d-xl-none">
              <a className="header__bar hamburger_menu" href="#">
                <div className="header__bar-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
            {account ? (
              <div className="header__account">
                <a
                  onClick={() =>
                    navigator.clipboard.writeText(detail?.address)
                  }
                >
                  {shortenAddress(detail?.address)}:{" "}
                  {detail?.maticBal?.slice(0, 6)} {currency}
                </a>
              </div>
            ) : (
              <div className="header__account">
                <a onClick={connectMetaMask}>
                  Connect Wallet
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
