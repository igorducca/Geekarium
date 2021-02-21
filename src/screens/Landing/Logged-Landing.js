import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import "../../styles/global.css"
import "../../styles/screens/landing.styles.css"

import HeaderBar from "../../components/headerBar"

import $ from "jquery";
import axios from "axios";

import { FiTrendingUp, FiThumbsUp, FiStar, FiUsers, FiArchive } from "react-icons/fi";

export default function LoggedLanding() {

     const [cookies, setCookie] = useCookies(["gkid"]);

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

                         var userData = respp.data.data;

                         $("#verticalRecomendationUl").append(`<a href="/ler/${publi.publiUrlTitle}" id="recomendedListLiA"> <div id="vListPost"> <div id="vListPostInfoHandler"> <div id="vListAuthorDetails"> <img src="${userData.userPicture}" /> <p>${userData.screen_name}</p> </div> <h3>${publi.publiTitle}</h3> <p>${publi.publiCreationDate}</p> </div> <div id="vListPostThumbSection"> <img src="${publi.publiThumbnail}" /> </div> </div> </a>`)
                    })
               })
          })

          axios.get(`https://geekarium.herokuapp.com/publis/find`)
          .then(resp => {
               var data = resp.data.data;
               var publi = data[Math.floor(Math.random() * data.length)];

               axios.get(`https://geekarium.herokuapp.com/user/get/name/${publi.publiAuthor}`)
               .then(respp => {

                    var userData = respp.data.data;

                    $("#recomendedHolder").append(`<a id="renderedPostA" href="/ler/${publi.publiUrlTitle}"> <div id="renderedPost"> <div id="mainPostImage"> <img src="${publi.publiThumbnail}" /> </div> <div id="postLegendData"> <img src="${userData.userPicture}" /> <h3>matéria feita por @${userData.screen_name}</h3> </div> <div id="postLegendTitle"> <h1>${publi.publiTitle}</h1> <h3>Saiba mais detalhes lendo a matéria completa.</h3> </div> </div> </a>`)
               })
          })

          axios.get("https://geekarium.herokuapp.com/users/fetch")
          .then(resp => {
               var data = resp.data.data;

               var selectedProfiles = [];

               for (var i = 1; i < 4; i++) {
                    selectedProfiles.push(data[Math.floor(Math.random() * data.length)])
               };

               selectedProfiles.forEach(user => {

                    console.log(user)

                    $("#recomendedProfiles").append(`<a href="/perfil/${user.screen_name}" id="userLiA" > <li> <img src="${user.userPicture}" /> </li> </a>`)
               })
          })

          axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
          .then(respp => {

               axios.get("https://geekarium.herokuapp.com/users/fetch")
               .then(resp => {
                   var data = resp.data.data;
                   var userData = respp.data.data;

                   console.log(userData)

                   var followingAll = userData.following;

                   console.log(followingAll)

                   var followingList = [];

                   followingAll.forEach(following => {
                        var fT = following.target;

                        followingList.push(fT)
                   })

                   data.forEach(dbUser => {
                        if(dbUser.screen_name == userData.screen_name) return false;
                        if(followingList.includes(dbUser.screen_name)) {
                              $("#userRenderHolder").append(`<div id="userRenderLine"> <div id="userRender"> <img src="${dbUser.userPicture}" /> <div id="usernameFollowHolder"> <h2>@${dbUser.screen_name}</h2> <h3> ${dbUser.followers.length} seguidores </h3> <button id="suggestUserFollowButton">Seguindo</button> </div> </div> </div>`)
                        }
                        else {
                              $("#userRenderHolder").append(`<div id="userRenderLine"> <div id="userRender"> <img src="${dbUser.userPicture}" /> <div id="usernameFollowHolder"> <h2>@${dbUser.screen_name}</h2> <h3> ${dbUser.followers.length} seguidores </h3> <a href="/follow/${dbUser.screen_name}"> <button id="suggestUserFollowButton">Seguir</button> </a> </div> </div> </div>`)
                        }
                   })
               })
          })
     }, [])

     $("#suggestUserFollowButton").click(function() {
          console.log("a")
     })

     function follow() {
          console.log("a")
     }

     return (
          <div>
               <HeaderBar />

               <div className="postsHolder">
                    <div className="recomended" id="recomendedHolder" />

                    <div className="verticalRecomendations">
                         <ul>
                              <li id="verticalRecomendationUl" />
                         </ul>
                    </div>

                    <div className="vl" />

                    <div className="recomendedProfiles">

                         <h2>Novas pessoas</h2>

                         <ul id="recomendedProfiles" />
                    </div>
               </div>

               <hr />

               <div id="landingTrendingTopics">
                    <div id="trendingTopicsTitle">
                         <FiArchive style={{marginRight:"20px", fontSize:"48px"}}/>
                         <h1>Veja algumas matérias</h1>
                    </div>

                    <div id="trendingTopicLine">
                         <ul id="publiHolder" />
                    </div>
               </div>

               <hr />

               <div className="trendingTags">
                    <div className="titleHolder">
                         <FiThumbsUp style={{marginRight:"20px"}}/>
                         <h2>Assuntos favoritos do público</h2>
                    </div>

                    <div className="subjectsHandler">
                         <div className="subjectsHolder">
                              <div id="subjectTitle">
                                   <h3>#WandaVision</h3>
                              </div>

                              <div id="subjectData">
                                   <div id="subjectLikeCount">
                                        <FiThumbsUp style={{marginRight:"10px"}}/>
                                        <p>50</p>
                                   </div>

                                   <div id="subjectStartsCount">
                                        <FiStar style={{marginRight:"10px"}}/>
                                        <p>25</p>
                                   </div>
                              </div> 

                              <div id="followSubjectButtonHolder">
                                   <button>Seguir</button>
                              </div>
                         </div>

                         <div className="subjectsHolder">
                              <div id="subjectTitle">
                                   <h3>#VingadoresUltimato</h3>
                              </div>

                              <div id="subjectData">
                                   <div id="subjectLikeCount">
                                        <FiThumbsUp style={{marginRight:"10px"}}/>
                                        <p>75</p>
                                   </div>

                                   <div id="subjectStartsCount">
                                        <FiStar style={{marginRight:"10px"}}/>
                                        <p>12</p>
                                   </div>
                              </div> 

                              <div id="followSubjectButtonHolder">
                                   <button>Seguir</button>
                              </div>
                         </div>
                    </div>
               </div>

               <hr />

               <div className="meetNewPeople">
                    <div className="titleHolder">
                         <FiUsers style={{marginRight:"20px"}}/>
                         <h2>Conheça novas pessoas</h2>
                    </div>

                    <div id="userRenderHolder" />
               </div>
          </div>
     )
}