import React from "react";
import { FaPlus } from "react-icons/fa6";


const Owner = ({setOwnerModel,
  TransferCurrency,
  details,
  currency,
  account,
  setTransferModel,
  setTransferCurrency,
  setOpenDonate,
  TOKEN_WITHDRAW,
  setOpenUpdatePrice,
  setOpenUpdateAddress}) => {
  return(
    <section className="team pos-rel">
       <div className="container">
         <div className="new-owner team__wrap ul_li">
           <div className="team__item"> 
               <div className="avatar">
                 <img src="assets/img/shape/c_shape1.png" alt="" />
               </div>
               <div className="team__info text-center mb-20">
                <h3>TOKEN TRANSFER</h3>
                <span>Any ERC 20</span>
               </div>

               <div className="team__social ul_li_center">
                <span 
                className="h-icon" style={{
                  cursor:"pointer",
                }}
                onClick={()=>{setOwnerModel(false),
                  setTransferModel(true)
                }}>
                  <FaPlus/>
                </span>
               </div>

           </div>
           <div className="team__item"> 
               <div className="avatar">
                 <img src="assets/img/token/t_info_img.png" alt="" />
               </div>
               <div className="team__info text-center mb-20">
                <h3>TRANSFER FUND</h3>
                <span>{details?.maticBal.slice(0,6)} {currency} </span>
               </div>

               <div className="team__social ul_li_center">
                <span 
                className="h-icon" style={{
                  cursor:"pointer",
                }}
                onClick={()=>{setOwnerModel(false),
                  setTransferCurrency(true)
                }}>
                  <FaPlus/>
                </span>
               </div>

           </div>
           <div className="team__item"> 
               <div className="avatar">
                 <img src="assets/img/shape/c_shape2.png" alt="" />
               </div>
               <div className="team__info text-center mb-20">
                <h3>DONATE FUND</h3>
                <span>If You Can</span>
               </div>

               <div className="team__social ul_li_center">
                <span 
                className="h-icon" style={{
                  cursor:"pointer",
                }}
                onClick={()=>{setOwnerModel(false),
                  setOpenDonate(true)
                }}>
                  <FaPlus/>
                </span>
               </div>

           </div>

           {
            account == details?.owner && (
             <>
             <div className="team__item"> 
              <div className="avatar">
                <img src="assets/img/token/t_info_img.png" alt="" />
              </div>
              <div className="team__info text-center mb-20">
               <h3>WITHDRAW</h3>
               <span>ICO TOKEN,Only Owner</span>
              </div>

              <div className="team__social ul_li_center">
               <span 
               className="h-icon" style={{
                 cursor:"pointer",
               }}
               onClick={()=>TOKEN_WITHDRAW()
               }>
                 <FaPlus/>
               </span>
              </div>

              </div>
              
              <div className="team__item"> 
              <div className="avatar">
                <img src="assets/img/token/t_info_img.png" alt="" />
              </div>
              <div className="team__info text-center mb-20">
               <h3>UPDATE TOKEN</h3>
               <span>ICO TOKEN,Only Owner</span>
              </div>

              <div className="team__social ul_li_center">
               <span 
               className="h-icon" style={{
                 cursor:"pointer",
               }}
               onClick={()=> (setOwnerModel(false),setOpenUpdateAddress(true))
               }>
                 <FaPlus/>
               </span>
              </div>

              </div>

              <div className="team__item"> 
              <div className="avatar">
                <img src="assets/img/token/t_info_img.png" alt="" />
              </div>
              <div className="team__info text-center mb-20">
               <h3>UPDATE TOKEN PRICE</h3>
               <span>ICO TOKEN,Only Owner</span>
              </div>

              <div className="team__social ul_li_center">
               <span 
               className="h-icon" style={{
                 cursor:"pointer",
               }}
               onClick={()=> (setOwnerModel(false),setOpenUpdatePrice(true))
               }>
                 <FaPlus/>
               </span>
              </div>

              </div>
              </> 

              
            ) 
           }
         </div>
       </div>

       <div className="team__shape">
        <div className="shape shape--1">
          <img src="assets/img/shape/t_shape1.png" alt="" />
        </div>
        <div className="shape shape--2">
          <img src="assets/img/shape/t_shape1.png" alt="" />
        </div>
       </div>
    </section>
  )
};

export default Owner;