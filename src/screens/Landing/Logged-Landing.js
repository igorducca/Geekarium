import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

import "../../styles/global.css"
import "../../styles/screens/landing.styles.css"

import HeaderBar from "../../components/headerBar"

import $ from "jquery";
import axios from "axios";

import { FiTrendingUp, FiThumbsUp, FiStar, FiUsers } from "react-icons/fi";

export default function LoggedLanding() {

     const [cookies, setCookie] = useCookies(["gkid"]);

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
                    <div className="recomended">
                         <div id="renderedPost">
                              <div id="mainPostImage">
                                   <img src="https://rollingstone.uol.com.br/media/_versions/wanda-pietro-wandavision-ep6_widelg.jpg" />
                              </div>

                              <div id="postLegendData">
                                   <img src="https://i.pinimg.com/originals/a3/f3/e7/a3f3e74b0bca67c0538383efb32c402c.png" />
                                   <h3>matéria feita por Igor Duca</h3>
                              </div>

                              <div id="postLegendTitle">
                                   <h1>WandaVision - O Mercúrio é uma representação de Mephisto?</h1>
                                   <h3>Sabia mais detalhes sobre a misteriosa aparição do Mercúrio na série WandaVision.</h3>
                              </div>
                         </div>
                    </div>

                    <div className="verticalRecomendations">
                         <ul>
                              <li>
                                   <div id="vListPost">
                                        <div id="vListPostInfoHandler">
                                             <div id="vListAuthorDetails">
                                                  <img src="https://yt3.ggpht.com/ytc/AAUvwnh9_CkLaV-M2viRDvtgnmqqhr2EoXvjeSLurcbi=s88-c-k-c0x00ffffff-no-rj" />
                                                  <p>Pop Show Tv</p>
                                             </div>

                                             <h3>A emocionante história por trás de Rocky</h3>

                                             <p>16/02/2021</p>
                                        </div>
                                        <div id="vListPostThumbSection">
                                             <img src="https://i.ytimg.com/vi/-IFrkkZoQtc/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBKXjcoLKm28qrSdSq1O6NNgJJtcQ" />
                                        </div>
                                   </div>

                                   <div id="vListPost">
                                        <div id="vListPostInfoHandler">
                                             <div id="vListAuthorDetails">
                                                  <img src="https://freepikpsd.com/wp-content/uploads/2019/10/css-png-Transparent-Images.png" />
                                                  <p>Css Guru</p>
                                             </div>

                                             <h3>Veja os melhores truques de css para 2021</h3>

                                             <p>16/02/2021</p>
                                        </div>
                                        <div id="vListPostThumbSection">
                                             <img src="https://www.freecodecamp.org/news/content/images/2020/12/fcc-bg-image-2.png" />
                                        </div>
                                   </div>

                                   <div id="vListPost">
                                        <div id="vListPostInfoHandler">
                                             <div id="vListAuthorDetails">
                                                  <img src="https://www.einerd.com.br/wp-content/uploads/2017/04/ei-nerd-logo.png" />
                                                  <p>Ei Nerd</p>
                                             </div>

                                             <h3>Após demissão de The Mandalorian, Gina Carano anuncia filme com site conservador</h3>

                                             <p>16/02/2021</p>
                                        </div>
                                        <div id="vListPostThumbSection">
                                             <img src="https://www.einerd.com.br/wp-content/uploads/2021/02/Gina-Carano-demissao-the-mandalorian-capa.jpg" />
                                        </div>
                                   </div>
                              </li>
                         </ul>
                    </div>

                    <div className="vl" />

                    <div className="recomendedProfiles">

                         <h2>Recomendados</h2>

                         <ul>
                              <li>
                                   <img src="https://fastly.syfy.com/sites/syfy/files/styles/1200x680/public/calcifer-howls-moving-castle.jpg?offset-y=0" />
                              </li>

                              <li>
                                   <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" />
                              </li>

                              <li>
                                   <img src="https://i.pinimg.com/originals/a3/f3/e7/a3f3e74b0bca67c0538383efb32c402c.png" />
                              </li>
                         </ul>
                    </div>
               </div>

               <hr />

               <div id="trendingGeekTopics">
                    <div className="titleHolder">
                         <FiTrendingUp style={{marginRight:"20px"}}/>
                         <h2>Tópicos em alta</h2>
                    </div>

                    <div id="trendingTopicLine" />
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