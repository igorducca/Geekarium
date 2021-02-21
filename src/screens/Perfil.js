import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiUsers, FiArchive, FiAtSign, FiHome } from "react-icons/fi";
import Modal from "react-modal";
import "react-modal/dist/react-modal"
import { useCookies } from "react-cookie";
import $ from "jquery";

import "../styles/screens/perfil.styles.css";

export default function Perfil() {

     const [cookies, setCookie] = useCookies(["gkid"]);

     let { user } = useParams();

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

     const [imageChangeIsOpen, serImageChangeOpened] = React.useState(false);
     const [ urlImage, setUrlImage ] = useState("");

     useEffect(() => {

          axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
          .then(resp => {
               var data = resp.data.data;

               if(data.screen_name != user) {
                    $("#titleHeader").append(`<img id="userVisitantImage" src="${data.userPicture}"/>  <h1>@${user}</h1>`)
                    document.getElementById("followButton").href = `/follow/${user}`
               }
               else {
                    document.getElementById("authorView").hidden = false;
               }
          })

          axios.get(`https://geekarium.herokuapp.com/user/get/name/${user}`)
          .then(resp => {
               var data = resp.data.data;

               console.log(data)

               document.getElementById("userProfileImage").src = data.userPicture;
               document.getElementById("followerCount").innerText = `${data.followers.length} seguidores`
               document.getElementById("followingCount").innerText = `${data.following.length} seguindo`
               document.getElementById("postsCount").innerText = `${data.publis.length} publicações`

               var followers = data.followers;

               console.log(`length: ${followers.length}`)

               if(followers.length >= 1) {
                    axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
                    .then(respp => {
                         followers.forEach(follower => {
                              if(follower.target == respp.data.data.screen_name) {
                                   document.getElementById("followingButtonHolder").hidden = false;
                              }
                              else {
                                   document.getElementById("followButtonHolder").hidden = false;
                                   document.getElementById("followButton").href = `/follow/${user}`
                              }
                         })
                    })
               }
               else {
                    document.getElementById("followButtonHolder").hidden = false;
                    document.getElementById("followButton").href = `/follow/${user}`
               }
          })
     }, [])

     function imageChangeOpen() {
          serImageChangeOpened(true);
     }

     function closeImageChange() {
          serImageChangeOpened(false);
     }

     function changeImage() {
          axios.post(`https://geekarium.herokuapp.com/user/image/change/${user}`, {
               url: urlImage
          })
          .then(resp => {
               var data = resp.data;

               if(data.sucesso == true) return window.location.reload();
          })
     }

     return (
          <div>
               <div id="profileHeaderDiv">
                    <div className="background-image" />

                    <FiHome style={{color:"white", fontSize:"24px", marginBottom:"20px", cursor:"pointer"}} onClick={() => { window.location.href="/" }} />

                    <div id="titleHeader">
                         <div id="authorView" hidden>
                              <img id="userProfileImage" onClick={imageChangeOpen}/>
                              <h1>@{user}</h1>
                         </div> 
                    </div>

                    <div id="followButtonHolder" hidden>
                         <a id="followButton"><button>Seguir</button></a>
                    </div>

                    <div id="followingButtonHolder" hidden>
                         <button id="followingButton">Seguindo</button>
                    </div>

                    <div id="dataHolder">
                         <div id="dataContainer">
                              <FiUsers style={{color:"white", fontSize:"24px"}}/>
                              <h2 id="followerCount" /> 
                         </div>

                         <div id="dataContainer">
                              <FiAtSign style={{color:"white", fontSize:"24px"}}/>
                              <h2 id="followingCount" /> 
                         </div>

                         <div id="dataContainer">
                              <FiArchive style={{color:"white", fontSize:"24px"}}/>
                              <h2 id="postsCount" /> 
                         </div>
                    </div>
               </div>

               <Modal
                    isOpen={imageChangeIsOpen}
                    onRequestClose={closeImageChange}
                    style={customStyles}
                    contentLabel="Modal de Login"
                    id="notifyModal"
               >
                    <div id="profileImageTitle">
                         <h1>Altere a sua imagem de perfil</h1>
                    </div>

                    <div id="newImageInputHolder">
                         <input id="newImageInput" value={urlImage} onChange={(key) => { setUrlImage(key.target.value) }} placeholder="Coloque o link aqui!" />
                    </div>

                    <div id="confirmButtonHolder">
                         <button id="confirmButton" onClick={changeImage} >Confirmar</button>
                    </div>
               </Modal>
          </div>
     )
}