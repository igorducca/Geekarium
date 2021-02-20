import React, { useState, useEffect } from "react";
import { FiSearch, FiLogIn, FiLock, FiUser, FiEye, FiBell } from "react-icons/fi";
import { FaFire, FaDoorOpen } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import $ from "jquery";

import Logo from "../assets/geekarium-logo.png"

import Login from "../scripts/Login";
import Signup from "../scripts/Signup";

import Modal from "react-modal";
import "react-modal/dist/react-modal"
import "../styles/components/headerBar.styles.css"

export default function HeaderBar() {

     function useQuery() {
          return new URLSearchParams(useLocation().search);
     }

     let query = useQuery();

     const [ username, setUsername ] = useState("");
     const [ password, setPassword ] = useState("");

     const customStyles = {
          content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
          }
     };

     const [modalLoginIsOpen, setLoginIsOpen] = React.useState(false);
     const [modalSignupIsOpen, setSignpIsOpen] = React.useState(false);
     const [modalProfileIsOpen, setProfileIsOpen] = React.useState(false);
     const [modalNotifyIsOpen, setNotifyIsOpen] = React.useState(false);

     function openModalLogin() {
          setLoginIsOpen(true);
     }

     function openModalSignup() {
          setSignpIsOpen(true);
     }

     function closeModalLogin(){
          setLoginIsOpen(false);
     }

     function closeModalSignup(){
          setSignpIsOpen(false);
     }

     function openNotifyModal() {
          setNotifyIsOpen(true);

          axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
          .then(resp => {
               var data = resp.data.data;

               axios.get(`https://geekarium.herokuapp.com/user/notify/${data.userId}`)
               .then(respp => {
                    var notifyAll = respp.data.data;

                    notifyAll.forEach(notify => {
                         $("#notifyDisplayer").append(` <li id="generatedNotifyLi"> <div id="generatedNotify"> <h2>🔔 ${notify.notifyTitle}</h2> <h3>${notify.notifyBody}</h3> </div> </li> `)
                    })
               })
          })
     }

     function closeNotifyModal() {
          setNotifyIsOpen(false);
     }

     function openModalProfile() {
          axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
          .then(resp => {
               var data = resp.data;

               setProfileIsOpen(true);
               document.getElementById("userModalImage").src = data.data.userPicture;
               document.getElementById("modalProfileUsername").innerText = `@${data.data.screen_name}`
               document.getElementById("profileUrlHolder").href = `/perfil/${data.data.screen_name}`
          })
     }

     function closeModalProfile(){
          setProfileIsOpen(false);
     }

     var today = new Date()
     var curHr = today.getHours()
     var hourTitle;

     if (curHr < 12) {
          hourTitle = "Bom dia"
     } else if (curHr < 18) {
          hourTitle = "Boa tarde";
     } else {
          hourTitle = "Boa noite";
     }

     function modalChange() {
          setLoginIsOpen(false);
          setSignpIsOpen(true);
     }

     function goToTrendingTopics() {
          setProfileIsOpen(false);
          document.getElementById("trendingGeekTopics").scrollIntoView({ behavior: 'smooth', block: 'end'});
     }

     function logout() {
          function removeItem(sKey, sPath, sDomain) {
               document.cookie = encodeURIComponent(sKey) + 
                             "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
                             (sDomain ? "; domain=" + sDomain : "") + 
                             (sPath ? "; path=" + sPath : "");
           }
           
          removeItem("gkid");
          window.location.reload();
     }

     const [cookies, setCookie] = useCookies(["gkid"]);

     console.log(`Gk ID: ${cookies.gkid}`)

     useEffect(() => {
          if(cookies.gkid) {
               axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
               .then(resp => {
                    var data = resp.data;

                    console.log(data)

                    if(resp.data.data == null) {
                         console.log(`O usuário com o cookie ${cookies.gkid} não foi encontrado`)

                         function removeItem(sKey, sPath, sDomain) {
                              document.cookie = encodeURIComponent(sKey) + 
                                            "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
                                            (sDomain ? "; domain=" + sDomain : "") + 
                                            (sPath ? "; path=" + sPath : "");
                          }
                          
                         removeItem("gkid");
                         window.location.reload();
                    }
                    else {
                         document.getElementById("userHeaderBarImage").src = data.data.userPicture;
                    }
               })

               axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
               .then(respp => {
                    var firstData = respp.data.data;

                    axios.get(`https://geekarium.herokuapp.com/user/notify/${firstData.userId}`)
                    .then(resp => {
                         var data = resp.data.data;
     
                         if(data.length >= 1) return document.getElementById("notifyBell").style.color = "#1ca72a"
                    })
               })
          } 
          if(query.get("ref") == "signupcomplete") {
               setLoginIsOpen(true);
          }
     }, [])

     if(cookies.gkid) {
          return (
               <div className="content" id="loggedContent">
                    <div className="title">
                         <img src={Logo} />
                         <h1>Geekarium |</h1>
                         <h2 style={{marginLeft:"20px"}}>{hourTitle}</h2>
                    </div>
     
                    <div className="user">
                         <FiSearch className="searchButton"/>
                         <FiBell className="searchButton" onClick={openNotifyModal} id="notifyBell"/>
                         <button id="headerButton" onClick={() => { window.location.href="/publi" }}>Publicar</button>
                         <img id="userHeaderBarImage" onClick={openModalProfile} />
                    </div>

                    <Modal
                         isOpen={modalProfileIsOpen}
                         onRequestClose={closeModalProfile}
                         style={customStyles}
                         contentLabel="Modal de Login"
                         id="profileModal"
                         ariaHideApp={false}
                    >

                         <div id="centeredText">
                              <img id="userModalImage" />
                         </div>

                         <div id="centeredText">
                              <h2 id="modalProfileUsername" />
                         </div>

                         <div id="centeredText">
                              <a id="profileUrlHolder"><button> <FiUser style={{marginRight:"10px"}} /> Meu perfil</button></a>
                         </div>

                         <div id="centeredText" onClick={goToTrendingTopics}>
                              <button id="trendingTopicsButton"> <FaFire style={{marginRight:"10px"}} type="button" />Tópicos em alta</button>
                         </div>

                         <div id="centeredText" onClick={logout}>
                              <button id="logoutModalButton"> <FaDoorOpen style={{marginRight:"10px"}} type="button" />Sair</button>
                         </div>
                    </Modal>
                    <Modal
                         isOpen={modalNotifyIsOpen}
                         onRequestClose={closeNotifyModal}
                         style={customStyles}
                         contentLabel="Modal de Login"
                         id="notifyModal"
                    >
                         <div id="notifyModalTitleHolder">
                              <h1>Suas notificações</h1>
                         </div>

                         <div id="notifyDisplayerHolder">
                              <ul id="notifyDisplayer" />
                         </div>
                    </Modal>
               </div>
          )
     }
     else {
          return (
               <div className="content" id="NotLoggedContent">
                    <div className="title">
                         <img src={Logo} />
                         <h1>Geekarium |</h1>
                         <h2 style={{marginLeft:"20px"}}>{hourTitle}</h2>
                    </div>
     
                    <div className="user">
                         <FiSearch className="searchButton"/>
                         <a id="enterButton" onClick={openModalLogin}>Entrar</a>
                         <button id="joinUsButton" onClick={openModalSignup}>Juntar-se</button>
                    </div>
                    <Modal
                         isOpen={modalLoginIsOpen}
                         onRequestClose={closeModalLogin}
                         style={customStyles}
                         contentLabel="Modal de Login"
                         id="loginModal"
                    >
                         <div className="modalTitleHolder">
                              <h1>Entre em sua conta</h1>
                         </div>

                         <div className="modalSubtitleWrapper">
                              <p>Entre em sua conta usando o nome de usuário e a senha escolidas durante o cadastro.</p>
                         </div>

                         <div className="loginInputWrapper">
                              <FiLogIn style={{fontSize:"24px", marginRight:"10px"}}/>
                              <input placeholder="Nome de usuário" onChange={(key) => { setUsername(key.target.value) }} value={username} id="loginUsernameInput"/>
                         </div>

                         <div className="loginInputWrapper">
                              <FiLock style={{fontSize:"24px", marginRight:"10px"}}/>
                              <input placeholder="Senha" type="password" onChange={(key) => { setPassword(key.target.value) }} value={password} id="loginPasswordInput"/>
                         </div>

                         <div className="rememberMeCheckbox">
                              <input type="checkbox" id="rememberMeCheckbox"/>
                              <p style={{marginLeft:"20px"}}>Lembrar-se de mim</p>
                         </div>

                         <div id="loginErrorDiv" />

                         <div className="loginButtonWrapper">
                              <button onClick={Login} type="button">Login</button>
                         </div>

                         <div className="loginButtonWrapper">
                              <a onClick={modalChange}>Ou crie a sua conta agora</a>
                         </div>
                    </Modal>

                    <Modal
                         isOpen={modalSignupIsOpen}
                         onRequestClose={closeModalSignup}
                         style={customStyles}
                         contentLabel="Modal de Login"
                         id="loginModal"
                    >
                         <div className="modalTitleHolder">
                              <h1>Crie a sua conta</h1>
                         </div>

                         <div className="modalSubtitleWrapper">
                              <p>Escolha um nome de usuário e uma senha para criar a sua nova conta no Geekarium.</p>
                         </div>

                         <div className="loginInputWrapper">
                              <FiLogIn style={{fontSize:"24px", marginRight:"10px"}}/>
                              <input placeholder="Nome de usuário" id="signupInputUsername"/>
                         </div>

                         <div className="loginInputWrapper">
                              <FiEye style={{fontSize:"24px", marginRight:"10px"}}/>
                              <input placeholder="Nome de exibição" id="loginScreenNInput"/>
                         </div>

                         <div className="loginInputWrapper">
                              <FiLock style={{fontSize:"24px", marginRight:"10px"}}/>
                              <input placeholder="Senha" type="password" id="signupInputPassword"/>
                         </div>

                         <div className="loginButtonWrapper">
                              <button type="button" onClick={Signup} >Criar</button>
                         </div>
                    </Modal>
               </div>
          )
     }
}