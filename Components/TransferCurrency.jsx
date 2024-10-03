import React, { useState, useEffect } from "react";

const TransferCurrency = ({
  setTransferCurrency,
  TRANSFER_ETHER,
  details,
  currency,
  CHECK_ACCOUNT_BALANCE,
  setLoader,
}) => {
  const [transfer, setTransfer] = useState({
    _amount: "",
    _reciever: "",
  });

  const [address, setAddress] = useState();

  useEffect(() => {
    if (address) {
      const loadToken = async () => {
        setLoader(true);
        try {
          const balance = await CHECK_ACCOUNT_BALANCE(address);

          if (balance === undefined) {
            console.error("Kindly pass a valid token address.");
          } else {
            console.log(balance);
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
        } finally {
          setLoader(false);
        }
      };
      loadToken();
    }
  }, [address]);

  return (
    <section className="new-margin ico-contact pos-rel">
      <div className="container mb-20">
        <div className="ico-contact__wrap">
          <h2 className="title">
            Transfer ETH {currency}
            <strong onClick={() => setTransferCurrency(false)}>X</strong>
          </h2>

          <div>
            <div className="row">
              <div className="col-lg-12">
                <input
                  type="text"
                  placeholder="Receiver Address"
                  onChange={(e) => {
                    setTransfer({
                      ...transfer,
                      _reciever: e.target.value,
                    });
                    setAddress(e.target.value);
                  }}
                />
              </div>

              <div className="col-lg-12 mb-20">
                <input
                  type="text"
                  placeholder="Amount to Send"
                  onChange={(e) =>
                    setTransfer({
                      ...transfer,
                      _amount: e.target.value,
                    })
                  }
                />
              </div>

              <p>
                <strong>Balance:</strong> {details?.maticBal || "0"} {currency} {/* Default to 0 if balance is unavailable */}
              </p>

              <div className="ico-contact__btn text-center mt-10">
                <button
                  className="thm-btn"
                  onClick={() => TRANSFER_ETHER(transfer)}
                >
                  Transfer Currency {/* Fixed typo here */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferCurrency;
