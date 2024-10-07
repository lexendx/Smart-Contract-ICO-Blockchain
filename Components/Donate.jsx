import React ,{useState,useEffect}from "react";

const Donate = (
               {details,
               currency,
               setOpenDonate,
              DONATE}) => {
 
  const [donateFund,setDonateFund] = useState()

  

  return(
    <section className="new-margin ico-contact pos-rel">
        <div className="container mb-20">
          <div className="ico-contact__wrap">
            <h2 className="title">Donate {currency}<strong onClick={()=>setOpenDonate(false)}>X</strong></h2>
            
            <div>
            <div className="row">
              <div className="col-lg-12 mb-20">
               
              </div>
              <div className="col-lg-12 mb-20">
              <input
                    type="text"
                    placeholder="_amount"
                    onChange={(e)=>setDonateFund(e.target.value)}
                  />
              </div>

             

              <p>
                <strong>Balance:</strong>{details?.maticBal} {currency}
              </p>

              <div className="ico-contact__btn text-center mt-10">
                <button className="thm-btn" onClick={()=> DONATE(donateFund)}>
                  Donate
                </button>
              </div>

              

              
            </div>
          </div>

           
          </div>

          
        </div>
      
    </section>
  )
};

export default Donate;