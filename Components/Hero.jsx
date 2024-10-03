import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Hero = ({
  setBuyModal,
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  addTokenToMetaMask,
  details,
}) => {
  // Success and error toast notifications
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      setLoader(true);
      const address = await CONNECT_WALLET();
      setAccount(address);
    } catch (error) {
      notifyError("Failed to connect wallet");
    } finally {
      setLoader(false);
    }
  };

  // State for token sale percentage
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      const tokenSold = details?.soldTokens ?? 0;
      const tokenTotalSupply = details?.soldTokens + (Number(details?.tokenBal) || 1);

      const percentageNew = (tokenSold / tokenTotalSupply) * 100;

      if (tokenTotalSupply === 0) {
        console.log("Token sale balance is zero and cannot calculate percentage");
      } else {
        setPercentage(percentageNew);
      }
    };

    // Call function and update percentage every second
    calculatePercentage();
    const timer = setTimeout(calculatePercentage, 1000);
    return () => clearTimeout(timer);
  }, [details]);

  // Function to add token to MetaMask
  const ADD_TOKEN_METAMASK = async () => {
    try {
      setLoader(true);
      const response = await addTokenToMetaMask();
      notifySuccess(response);
    } catch (error) {
      notifyError("Failed to add token to MetaMask");
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="hero hero__ico pos-rel">
      <div className="hero__bg" data-background="assets/img/bg/hero_bg.png" />

      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="hero__content">
              <h1 className="title mb-45">
                Participate In the <span>Ongoing ICO Token</span> Sale
              </h1>

              <div className="btns">
                {account ? (
                  <a className="thm-btn" onClick={() => setBuyModal(true)}>
                    Purchase Token
                  </a>
                ) : (
                  <a className="thm-btn" onClick={connectWallet}>
                    Connect Wallet
                  </a>
                )}
                <a className="thm-btn thm-btn--dark" onClick={ADD_TOKEN_METAMASK}>
                  Add MetaMask
                </a>
              </div>

              <div className="hero__progress mt-50">
                <div className="progress-title ul_li_between">
                  <span>
                    <span>Raised - </span>
                    {details?.soldTokens} Tokens
                  </span>

                  <span>
                    <span>Total ICO - </span>
                    {details?.soldTokens + Number(details?.tokenBal)} {details?.symbol}
                  </span>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${percentage}%`, // Added the `%` symbol for proper width calculation
                    }}
                  />
                </div>

                <ul className="ul_li_between">
                  <li>Pre Sell</li>
                  <li>Soft Cap</li>
                  <li>Bonus</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="hero__explore-wrap text-center">
              <div className="hero__explore text-center">
                <div className="scroll-down" />
                <span>Explore Causes</span>
              </div>

              <div className="hero__countdown">
                <h6 className="text-center">ICO Will Start in...</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__shape">
        <div className="shape shape--1">
          <img src="assets/img/shape/h_shape.png" alt="Shape" />
        </div>
        <div className="shape shape--2">
          <img src="assets/img/shape/h_shape2.png" alt="Shape" />
        </div>
        <div className="shape shape--3">
          <img src="assets/img/shape/h_shape3.png" alt="Shape" />
        </div>
      </div>

      <div className="hero__coin">
        <div className="coin coin--1">
          <img src="assets/img/icon/coin1.png" alt="Coin" />
        </div>
        <div className="coin coin--2">
          <img src="assets/img/icon/coin2.png" alt="Coin" />
        </div>
        <div className="coin coin--3">
          <img src="assets/img/icon/coin3.png" alt="Coin" />
        </div>
        <div className="coin coin--4">
          <img src="assets/img/icon/coin4.png" alt="Coin" />
        </div>
        <div className="coin coin--5">
          <img src="assets/img/icon/coin5.png" alt="Coin" />
        </div>
        <div className="coin coin--6">
          <img src="assets/img/icon/coin6.png" alt="Coin" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
