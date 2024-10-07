import React ,{useState,useEffect}from "react";

const TransferToken = (
  {setTransferModel,
  TRANSFER_TOKEN,
  ERC20,
  setLoader}) => {
 
  const [token,setToken] = useState({
    _sendTo:"",
    _amount:"",
    _tokenAddress:"",
  })
  
  const [tokenDetails,setTokenDetails] = useState();
  const [transferToken,setTransferToken] = useState();

  useEffect(()=> {

    if(transferToken){
      const loadToken = async () => {
        setLoader(true);
        const token = await ERC20(transferToken);
  
        if(token== undefined){
          console.log("kindly pass the token address")
        }
        else{
          setTokenDetails(token);
          console.log(token);
        }
        setLoader(false);
      }
      loadToken();
    }
   
  },[transferToken])

  return(
    <section className="new-margin ico-contact pos-rel">
        <div className="container mb-20">
          <div className="ico-contact__wrap">
            <h2 className="title">Transfer Token<strong onClick={()=>setTransferModel(false)}>X</strong></h2>
            
            <div>
            <div className="row">
              {/* 1st input field  */}
              <div className="col-lg-12">
                {
                  tokenDetails?.name ? (<input type="text" value={`Name ${tokenDetails?.name} Balance ${tokenDetails?.balance} ${tokenDetails?.symbol}`} />) : 
                  (<input
                    type="text"
                    placeholder="_tokenAddress"
                    onChange={(e)=>{
                      setToken({
                        ...tokenDetails,
                        _tokenAddress:e.target.value,
                      }),
                      setTransferModel(e.target.value)
                    }}
                  />)
                }
              </div>

              {/* 2nd input field  */}
              <div className="col-lg-12 mb-20">
              <input
                    type="text"
                    placeholder="_sendTO"
                    onChange={(e)=> setToken({
                      ...token,
                      _sendTo:e.target.value,
                    })
                      
                    }
                  />
              </div>

              
              {/* 3rd input feild  */}
              <div className="col-lg-12 mb-20">
              <input
                    type="text"
                    placeholder="_amount"
                    onChange={(e)=>{
                      const value=e.target.value;
                      setToken({
                        ...token,
                        _amount:value,
                      })}
                      
                    }
                  />
              </div>

              <div className="ico-contact__btn text-center mt-10">
                <button className="thm-btn" onClick={()=> TRANSFER_TOKEN(token)}>
                  Tranfer Token
                </button>
              </div>
            </div>
          </div>

           
          </div>

          
        </div>
      
    </section>
  )
};

export default TransferToken;