import React, { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import { FiBook } from "react-icons/fi";
import { FaClock } from "react-icons/fa";
import axios from "axios";
import { useCookies } from "react-cookie";
import $ from "jquery";

import "../styles/screens/publicar.styles.css"

export default function Publicar() {

     const [cookies, setCookie] = useCookies(["gkid"]);

     const [value, setValue] = useState("Escreva a sua matéria aqui!");
     const [ publiName, setPubliName ] = useState("Nome da sua matéria");
     const [ publiThumb, setPubliThumb ] = useState("Url da thumbnail de sua matéria");

     useEffect(() => {
          axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
          .then(resp => {
               var data = resp.data.data;

               console.log(data)

               $("#authorPreview").append(`<h2> @${data.screen_name} </h2>`)
          })
     }, [])

     function Publicar() {
          var readTime = document.getElementById("timeSelect").value;

          if(readTime == "⏰ Quantos minutos de leitura tem a sua matéria?") {
               readTime = "3 min"
          }

          axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
          .then(resp => {
               var data = resp.data.data;

               var user = data.screen_name;

               axios.post(`https://geekarium.herokuapp.com/publi/post`, {
                    author: user,
                    title: publiName,
                    readTime: readTime,
                    thumb: publiThumb,
                    text:value
               })
               .then(respp => {
                    console.log(respp.data)

                    if(respp.data.sucesso == true) {
                         window.location.href = `/ler/${respp.data.title}`
                    }
               })

          })
     }

     if(cookies) {
          return (
               <div>
                    <div id="pageTitle">

                         <div id="authorPreview" /> 

                         <div className="title">
                              <FiBook style={{fontSize:"48px", marginRight:"10px"}}/>
                              <h1>Escreva a sua matéria!</h1>
                         </div>

                         <div className="inputHolder">
                              <input id="publiName" onChange={(key) => { setPubliName(key.target.value) }} value={publiName} />
                         </div>

                         <div className="inputHolder">
                              <input id="publiName" onChange={(key) => { setPubliThumb(key.target.value) }} value={publiThumb} />
                         </div>

                         <div className="timeSelectHolder">
                              <select id="timeSelect">
                                   <option>⏰ Quantos minutos de leitura tem a sua matéria?</option>
                                   <option>Menos de um min</option>
                                   <option>2 min</option>
                                   <option>3 min</option>
                                   <option>5 min</option>
                                   <option>5+ min</option>
                              </select>
                         </div> 
                    </div>
     
                    <div className="container" id="editorHolder">
                         <MDEditor
                              value={value}
                              onChange={setValue}
                              id="textEditor"
                         />
                    </div>
     
                    <hr id="previewHr"/>
     
                    <div id="previewTitle">
                         <h1>Seu texto aparecerá aqui</h1>
                    </div>
     
                    <div className="container" id="previewHolder">
                         <MDEditor.Markdown source={value} type="button" />
                    </div>

                    <div className="publiButtonHolder">
                         <button id="publiButton" onClick={Publicar} >Publicar</button>
                    </div>
               </div>
          )
     }
     else {
          window.location.href = "/"
     }
}