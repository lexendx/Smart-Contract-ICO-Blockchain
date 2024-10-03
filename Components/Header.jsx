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
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null); // No account connected
    }
  };

  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts", // Fixed typo here
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error.message);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
      // Optionally, provide a link to MetaMask installation
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

  return (
    <header className="site-header header--transparent ico-header">
      <div className="header_main-wrap">
        <div className="container mxw_1640 ">
          <div className="header__main ul_li_between">
            <div className="header_left ul_li">
              <div className="header__logo">
                <a href="/">
                  <img src="assets/img/logo/logo.svg" alt="Logo" />
                </a>
              </div>
            </div>

            <div className="main-menu__wrap ul_li navbar navbar-expand-xl">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li>
                    <a className="active has-mega-menu" href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#about">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#roadmap">
                      Roadmap
                    </a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#team">
                      Team
                    </a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#faq">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#contact">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      className="scrollspy-btn"
                      style={{ cursor: "pointer" }}
                      onClick={() => setOwnerModal(!ownerModal)}
                    >
                      Tools
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header__action ul_li">
              <div className="d-xl-none">
                <a className="header__bar hamburger_menu">
                  <div className="header__bar-icon">
                    <span />
                    <span />
                    <span />
                    <span />
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
                    {shortenAddress(details?.address)}:{" "}
                    {details?.maticBal?.slice(0, 6)} {currency}
                  </a>
                </div>
              ) : (
                <div className="header__account">
                  <a onClick={connectMetamask} style={{ cursor: "pointer" }}>
                    Connect Wallet
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
