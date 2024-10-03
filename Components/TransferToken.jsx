import React, { useState, useEffect } from "react";

const TransferToken = ({
  setTransferModel,
  TRANSFER_TOKEN,
  ERC20,
  setLoader,
}) => {
  const [token, setToken] = useState({
    _sendTo: "",
    _amount: "",
    _tokenAddress: "",
  });

  const [tokenDetails, setTokenDetails] = useState();

  useEffect(() => {
    const loadToken = async () => {
      if (token._tokenAddress) {
        setLoader(true);
        try {
          const tokenInfo = await ERC20(token._tokenAddress);

          if (tokenInfo === undefined) {
            console.log("Kindly pass a valid token address");
          } else {
            setTokenDetails(tokenInfo);
            console.log(tokenInfo);
          }
        } catch (error) {
          console.error("Error loading token:", error);
        } finally {
          setLoader(false);
        }
      }
    };

    loadToken();
  }, [token._tokenAddress, ERC20, setLoader]);

  return (
    <section className="new-margin ico-contact pos-rel">
      <div className="container mb-20">
        <div className="ico-contact__wrap">
          <h2 className="title">
            Transfer Token
            <strong onClick={() => setTransferModel(false)}>X</strong>
          </h2>

          <div>
            <div className="row">
              <div className="col-lg-12 mb-20">
                {tokenDetails?.name ? (
                  <input
                    type="text"
                    value={`Name: ${tokenDetails.name} | Balance: ${tokenDetails.balance} ${tokenDetails.symbol}`}
                    readOnly
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Token Address"
                    onChange={(e) => {
                      setToken((prevToken) => ({
                        ...prevToken,
                        _tokenAddress: e.target.value,
                      }));
                      setTransferModel(e.target.value); // Assuming you want to set the token address in the model as well
                    }}
                  />
                )}
              </div>

              <div className="col-lg-12 mb-20">
                <input
                  type="text"
                  placeholder="Recipient Address"
                  onChange={(e) =>
                    setToken((prevToken) => ({
                      ...prevToken,
                      _sendTo: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-lg-12 mb-20">
                <input
                  type="text"
                  placeholder="Amount"
                  onChange={(e) =>
                    setToken((prevToken) => ({
                      ...prevToken,
                      _amount: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="ico-contact__btn text-center mt-10">
                <button
                  className="thm-btn"
                  onClick={() => TRANSFER_TOKEN(token)}
                >
                  Transfer Token {/* Fixed typo here */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferToken;
