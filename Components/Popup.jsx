import React, { useState, useEffect } from "react";
import { shortAddress } from "../Utils";

const Popup = ({
  setBuyModel,
  BUY_TOKEN,
  currency,
  details,
  account,
  ERC20,
  TOKEN_ADDRESS,
  setLoader,
}) => {
  const [amount, setAmount] = useState("");
  const [transferToken, setTransferToken] = useState(null);

  useEffect(() => {
    setLoader(true);
    ERC20(TOKEN_ADDRESS)
      .then((item) => {
        setTransferToken(item);
        console.log(item);
      })
      .catch((error) => console.error("Error fetching ERC20 token:", error))
      .finally(() => setLoader(false));
  }, [ERC20, TOKEN_ADDRESS, setLoader]);

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow only numeric values
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleBuyToken = () => {
    if (amount && !isNaN(amount) && Number(amount) > 0) {
      BUY_TOKEN(amount);
    }
  };

  return (
    <section className="new-margin ico-contact pos-rel">
      <div className="container mb-20">
        <div className="ico-contact__wrap">
          <h2 className="title">
            Buy Token<strong onClick={() => setBuyModel(false)} style={{ cursor: "pointer" }}>X</strong>
          </h2>

          <div>
            <div className="row">
              <div className="col-lg-6 mb-20">
                <input
                  type="text"
                  placeholder={`Token Balance: ${transferToken?.balance} ${transferToken?.symbol}`}
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>

              <div className="col-lg-6 mb-20">
                <input
                  type="text"
                  value={
                    amount && !isNaN(amount)
                      ? `${(amount * details?.tokenPrice).toFixed(2)} ${currency}`
                      : "Output Value"
                  }
                  readOnly
                />
              </div>

              <div className="col-lg-12 mb-20">
                <textarea
                  disabled
                  name="message"
                  cols="30"
                  rows="10"
                  placeholder={`Current Price: ${details?.tokenBal} ${details?.symbol} Token Address: ${shortAddress(details?.tokenAddr)}`}
                />
              </div>

              <div className="ico-contact__btn text-center mt-10">
                <button
                  className="thm-btn"
                  onClick={handleBuyToken}
                  disabled={!amount || isNaN(amount) || Number(amount) <= 0}
                >
                  Buy Token
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popup;
