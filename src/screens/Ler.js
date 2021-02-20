import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { useCookies } from "react-cookie";

import { FiClock } from "react-icons/fi";
import { FaHome } from "react-icons/fa"

import "../styles/screens/read.styles.css";

export default function Ler() {

     const [cookies, setCookie] = useCookies(["gkid"]);

     let { name } = useParams();

     console.log(name)

     useEffect(() => {
          if(cookies.gkid) {
               axios.get(`https://geekarium.herokuapp.com/get/publi/${name}`)
               .then(resp => {
                    var data = resp.data.data;
     
                    console.log(data);
     
                    document.getElementById("authorNameTitle").innerText = `Matéria escrita por @${data.publiAuthor}`;
                    document.getElementById("readTime").innerText = `Leitura de ${data.publiReadTime}`
                    document.getElementById("authorNameTitle").href = `/perfil/${data.publiAuthor}`
                    document.getElementById("publiTitle").style.backgroundImage = `url("${data.publiThumbnail}")`
                    document.getElementById("publiTitlePrev").innerText = `${data.publiTitle}`
                    
                    $("#publiText").append(`<p> ${data.publiText} </p>`)
               })
          }
          else return false;
     }, [])

     if(cookies.gkid) {
     
          return (
               <div>
                    <div id="publiTitle">

                         <div id="homeButtonHolder">
                              <a href="/"><FaHome /></a>
                         </div>

                         <div id="paddingAppliedDiv">
                              <div id="publiTitleHolder">
                                   <h1 id="publiTitlePrev" />
                              </div> 
                         </div>
                    </div>
     
                    <div id="publiDetailsHolder">
                         <div className="userAndImage">
                              <a id="authorNameTitle" href="https://www.google.com" />
                         </div>
     
                         <div className="readingTime">
                              <FiClock style={{fontSize:"24px", marginRight:"10px"}}/>
                              <h2 id="readTime" />
                         </div>
                    </div>
     
                    <div id="publiTextHolder">
                         <div id="publiText" />
                    </div>
               </div>
          )
     }
     else {
          window.location.href = "/"
     }
}