import React, { useEffect } from "react";

import axios from "axios";
import $ from "jquery";

import "../../styles/global.css"
import "../../styles/screens/landing.styles.css"

import HeaderBar from "../../components/headerBar"

import { FiTrendingUp, FiArchive } from "react-icons/fi";

import "../../styles/components/defaultLanding.styles.css"

export default function DefaultLanding() {

     useEffect(() => {
          axios.get(`https://geekarium.herokuapp.com/publis/find`)
          .then(resp => {
               var data = resp.data.data;

               var selectedPublis = [];

               for (var i = 1; i < 4; i++) {
                    selectedPublis.push(data[Math.floor(Math.random() * data.length)])
               };

               selectedPublis.forEach(publi => {
                    axios.get(`https://geekarium.herokuapp.com/user/get/name/${publi.publiAuthor}`)
                    .then(respp => {
                         if(respp.data.data != null) {
                              $("#publiHolder").append(`<a href="/ler/${publi.publiUrlTitle}" id="publiHolderA"> <div id="tredingTopic"> <div id="topicTitle"> <div id="trendingTopicAuthorInfoHolder"> <img src="${respp.data.data.userPicture}" /> <p id="trendingTopicUsername">Por @${publi.publiAuthor}</p> </div> <h3>${publi.publiTitle}</h3> <p>${publi.publiCreationDate} • Leitura de ${publi.publiReadTime}</p> </div> </div> </a>`)
                         }
                         else {
                              $("#trendingTopicLine").append(`<h1 id="trendingNull"> 🥶 Me desculpe, mas eu não encontrei nenhum trending topic </h1>`)
                         }
                    })
               })
          })
     }, [])

     return (
          <div>
               <HeaderBar />

               <div id="mainContentHolder">
                   <div id="mainContentTitle">
                    <h1>Compartilhe suas ideias com outras pessoas</h1>
                    <img src="https://img2.pngio.com/spider-gwen-tiny-transparent-png-clipart-free-download-ywd-geek-art-png-600_714.png" />
                   </div>
               </div>

               <div id="landingTrendingTopics">
                    <div id="trendingTopicsTitle">
                         <FiArchive style={{marginRight:"20px", fontSize:"48px"}}/>
                         <h1>Veja algumas matérias</h1>
                    </div>

                    <div id="trendingTopicLine">
                         <ul id="publiHolder" />
                    </div>
               </div>
          </div>
     )
}