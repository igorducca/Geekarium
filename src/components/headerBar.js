import React, { useState } from "react";
import { FiSearch, FiLogIn, FiLock, FiSkipBack } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import Login from "../scripts/Login";

import Modal from "react-modal";
import "react-modal/dist/react-modal"

import "../styles/components/headerBar.styles.css"

export default function HeaderBar() {

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

     const [cookies, setCookie] = useCookies(["gkid"]);

     if(cookies.gkid) {
          return (
               <div className="content">
                    <div className="title">
                         <h1>Geekarium |</h1>
                         <h2 style={{marginLeft:"20px"}}>{hourTitle}</h2>
                    </div>
     
                    <div className="user">
                         <FiSearch className="searchButton"/>
                         <button id="headerButton">Publicar</button>
                         <img src="https://www.mercurynews.com/wp-content/uploads/2019/03/SJM-L-MUSKPOT-0308.jpg?w=490"/>
                    </div>
               </div>
          )
     }
     else {
          return (
               <div className="content">
                    <div className="title">
                         <h1>Geekarium |</h1>
                         <h2 style={{marginLeft:"20px"}}>{hourTitle}</h2>
                    </div>
     
                    <div className="user">
                         <FiSearch className="searchButton"/>
                         <button id="headerButton" onClick={openModalLogin}>Login</button>
                         <button id="headerButton" onClick={openModalSignup} >Cadastrar</button>
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
                              <input placeholder="Nome de usuário" />
                         </div>

                         <div className="loginInputWrapper">
                              <FiLock style={{fontSize:"24px", marginRight:"10px"}}/>
                              <input placeholder="Senha" type="password"/>
                         </div>

                         <div className="rememberMeCheckbox">
                              <input type="checkbox" />
                              <p style={{marginLeft:"20px"}}>Lembrar-se de mim</p>
                         </div>

                         <div className="loginButtonWrapper">
                              <button type="button">Criar</button>
                         </div>
                    </Modal>
               </div>
          )
     }
}