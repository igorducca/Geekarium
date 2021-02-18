import React, { useEffect } from "react";

import axios from "axios";
import $ from "jquery";

import "../../styles/global.css"
import "../../styles/screens/landing.styles.css"

import HeaderBar from "../../components/headerBar"

import { FiTrendingUp } from "react-icons/fi";

import "../../styles/components/defaultLanding.styles.css"

export default function DefaultLanding() {

     useEffect(() => {
          axios.get(`https://geekarium.herokuapp.com/trendings/list`)
          .then(resp => {
               var data = resp.data.data;

               data.forEach(trending => {
                    axios.get(`https://geekarium.herokuapp.com/user/get/name/${trending.creator}`)
                    .then(respp => {
     
                         console.log(respp.data)

                         var position = data.indexOf(trending) + 1
     
                         $("#trendingTopicLine").append(`<div id="tredingTopic"> <div id="orderNumber"> <h1>${position}</h1> </div> <div id="topicTitle"> <div id="trendingTopicAuthorInfoHolder"> <img src="${respp.data.data.userPicture}" /> <p id="trendingTopicUsername">Por @${trending.creator}</p> </div> <h3>${trending.topicName}</h3> <p>${trending.creationDate} • Leitura de ${trending.readingTime}</p> </div> </div>`)
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
                         <FiTrendingUp style={{marginRight:"20px", fontSize:"48px"}}/>
                         <h1>Trending topics</h1>
                    </div>

                    <div id="trendingTopicLine">
                    </div>
               </div>
          </div>
     )
}