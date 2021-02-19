import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

import { FiClock } from "react-icons/fi";

import "../styles/screens/read.styles.css";

export default function Ler() {

     let { name } = useParams();

     useEffect(() => {
          axios.get(`https://geekarium.herokuapp.com/get/publi/${name}`)
          .then(resp => {
               var data = resp.data.data;

               console.log(data);

               document.getElementById("authorNameTitle").innerText = `Matéria escrita por @${data.publiAuthor}`;
               document.getElementById("readTime").innerText = `Leitura de ${data.publiReadTime}`
               document.getElementById("authorNameTitle").href = `/perfil/${data.publiAuthor}`
               
               $("#publiText").append(`<p> ${data.publiText} </p>`)
          })
     }, [])

     return (
          <div>
               <div id="publiTitle">
                    <div id="publiTitleHolder">
                         <h1>Mortal Kombat: com violência e menção ao Brasil, 1º trailer do filme é divulgado; assista</h1>
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