import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiUsers, FiArchive, FiAtSign, FiHome } from "react-icons/fi";
import Modal from "react-modal";
import "react-modal/dist/react-modal"

import "../styles/screens/perfil.styles.css";

export default function Perfil() {

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
          axios.get(`https://geekarium.herokuapp.com/user/get/name/${user}`)
          .then(resp => {
               var data = resp.data.data;

               console.log(data)

               document.getElementById("userProfileImage").src = data.userPicture;
               document.getElementById("followerCount").innerText = `${data.followers.length} seguidores`
               document.getElementById("followingCount").innerText = `${data.following.length} seguindo`
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
                         <img id="userProfileImage" onClick={imageChangeOpen}/>
                         <h1>@{user}</h1>
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