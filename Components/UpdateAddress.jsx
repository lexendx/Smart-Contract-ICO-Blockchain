import React ,{useState,useEffect}from "react";
import { shortAddress } from "../Utils";

const UpdateAddress = (
               {  details,
               currency,
               setOpenUpdateAddress,
               UPDATE_TOKEN,
               ERC20,
               setLoader,
              }) => {
 
          
    const [address,setAddress] = useState();
    const [transferToken,setTransferToken] = useState();
    const [tokenDetails,setTokenDetails] = useState();

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
        <div className="container ">
          <div className="ico-contact__wrap">
            <h2 className="title">Update Token <strong onClick={()=>setOpenUpdateAddress(false)}>X</strong></h2>
            
            <div>
            <div className="row">
            <div className="col-lg-12 mb-20">
                {
                  tokenDetails?.name ? (<input type="text" value={`Name ${tokenDetails?.name} Balance ${tokenDetails?.balance} ${tokenDetails?.symbol}`} />) : 
                  (<input
                    type="text"
                    placeholder="Token address"
                    onChange={(e)=>{
                      setAddress(e.target.value),
                      setTransferToken(e.target.value)
                    }}
                  />)
                }
              </div>

             

              <p>
                <strong>Current Price:</strong>{details?.tokenPrice} {currency} &nbsp; &nbsp;
                <strong>Token Balance:</strong>{details?.tokenBal} {""} {details?.symbol} &nbsp; &nbsp; <strong
                onClick={()=> navigator.clipboard.writeText(details?.tokenAddr)}
                >Token Address</strong>{details?.tokanBal}{shortAddress(details?.tokenAddr)}
              </p>

              <div className="ico-contact__btn text-center mt-10">
                <button className="thm-btn" onClick={()=>UPDATE_TOKEN(address)}>
                 Update Address
                </button>
              </div>

              

              
            </div>
          </div>

           
          </div>

          
        </div>
      
    </section>
  )
};

export default UpdateAddress;