import React from "react";
import { FiSearch } from "react-icons/fi";

import "../styles/components/headerBar.styles.css"

export default function HeaderBar() {

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

     return (
          <div className="content">
               <div className="title">
                    <h1>Geekarium |</h1>
                    <h2 style={{marginLeft:"20px"}}>{hourTitle}</h2>
               </div>

               <div className="user">
                    <button id="publishButton">Publicar</button>
                    <FiSearch className="searchButton"/>
                    <img src="https://i.pinimg.com/originals/a3/f3/e7/a3f3e74b0bca67c0538383efb32c402c.png" />
               </div>
          </div>
     )
}