import React, { useEffect } from "react";
import axios from "axios";

export default function Signup() {
     var username = document.getElementById("signupInputUsername").value;
     var password = document.getElementById("signupInputPassword").value;

     axios.post(`https://geekarium.herokuapp.com/users/create`, {
          username: username,
          password: password
     })
     .then(resp => {
          if(resp.data.sucesso == true) {
               window.location.href = "/?ref=signupcomplete"
          }
     })
}