import React, { useState, useEffect } from "react";
import { shortAddress } from "../Utils";

const UpdateAddress = ({
  details,
  currency,
  setOpenUpdateAddress,
  UPDATE_TOKEN,
  ERC20,
  setLoader,
}) => {
  const [address, setAddress] = useState("");
  const [transferToken, setTransferToken] = useState("");
  const [tokenDetails, setTokenDetails] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      if (transferToken) {
        setLoader(true);
        try {
          const token = await ERC20(transferToken);

          if (!token) {
            console.log("Kindly pass a valid token address");
          } else {
            setTokenDetails(token);
            console.log(token);
          }
        } catch (error) {
          console.error("Error loading token:", error);
        } finally {
          setLoader(false);
        }
      }
    };

    loadToken();
  }, [transferToken, ERC20, setLoader]);

  return (
    <section className="new-margin ico-contact pos-rel">
      <div className="container">
        <div className="ico-contact__wrap">
          <h2 className="title">
            Update Token <strong onClick={() => setOpenUpdateAddress(false)}>X</strong>
          </h2>

          <div>
            <div className="row">
              <div className="col-lg-12 mb-20">
                {tokenDetails ? (
                  <input
                    type="text"
                    value={`Name: ${tokenDetails.name} | Balance: ${tokenDetails.balance} ${tokenDetails.symbol}`}
                    readOnly
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Token address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setTransferToken(e.target.value);
                    }}
                  />
                )}
              </div>

              <p>
                <strong>Current Price:</strong> {details?.tokenPrice} {currency} &nbsp; &nbsp;
                <strong>Token Balance:</strong> {details?.tokenBal} {details?.symbol} &nbsp; &nbsp; 
                <strong
                  onClick={() => navigator.clipboard.writeText(details?.tokenAddr)}
                  style={{ cursor: "pointer" }}
                >
                  Token Address: {shortAddress(details?.tokenAddr)}
                </strong>
              </p>

              <div className="ico-contact__btn text-center mt-10">
                <button className="thm-btn" onClick={() => UPDATE_TOKEN(address)}>
                  Update Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateAddress;
