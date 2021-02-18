import React, { useEffect } from "react";
import axios from "axios";
import { useCookies, cookie } from "react-cookie";

export default function Login() {

     var cookies = document.cookie = "gkid"

     var username = document.getElementById("loginUsernameInput").value;
     var password = document.getElementById("loginPasswordInput").value;
     var rememberIf = document.getElementById("rememberMeCheckbox").value;

     console.log(rememberIf)

     axios.post(`https://geekarium.herokuapp.com/users/login`, {
          username: username,
          password: password
     })
     .then(resp => {
          if(resp.data.sucesso == true) {
               axios.get(`https://geekarium.herokuapp.com/cookie/generate/${resp.data.userId}`)
               .then(respp => {
                    console.log(respp.data)

                    if(respp.data.sucesso == true) {

                         function endOfWeek(date)
                         {
                              
                              var lastday = date.getDate() - (date.getDay() - 1) + 6;
                              return new Date(date.setDate(lastday));
                         
                         }

                         var dt = new Date(); 

                         var nextWeek = endOfWeek(dt).toString();

                         var cookieInfo = respp.data.cookie;

                         document.cookie = `gkid = ${cookieInfo}; expires=${nextWeek}; path=/`;

                         console.log(`Cookie adicionado: ${cookies}`)

                         if(rememberIf == "on") {
                              window.location.href = `/user/final/${cookieInfo}/1`
                         }
                         else {
                              window.location.href = `/user/final/${cookieInfo}/0`
                         }
                    }
               })
          }
     })
}