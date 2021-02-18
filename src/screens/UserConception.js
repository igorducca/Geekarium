import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useCookies } from "react-cookie";

import "../styles/components/userconception.styles.css";

export default function UserConception() {

     let { id, remember } = useParams();

     const [cookies, setCookie] = useCookies(["gkid"]);

     useEffect(() => {

          if(remember == 1) {
     
               function screenChange() {
                    window.location.href = "/"
               }
               
               setTimeout(() => {
                    screenChange()
               }, 3000);
          }
          else {
               function screenChange() {
                    window.location.href = "/"
               }

               setTimeout(() => {
                    screenChange()
               }, 3000);
          }

     }, [])

     return (
          <div id="userConceptContent">
               <div id="loaderWrapper">
                    <h1>Finalizando o seu login...</h1>

                    <div id="loaderHolder">
                         <Loader
                              type="Puff"
                              color="#949494"
                              height={100}
                              width={100}
                              timeout={3000} //3 secs
                         /> 
                    </div>
               </div>
          </div>
     )
}