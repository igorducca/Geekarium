import React, { useEffect } from "react";
import axios from "axios";

export default function Login() {
     var username = document.getElementById("loginUsernameInput").value;
     var password = document.getElementById("loginPasswordInput").value;

     axios.post(`https://geekarium.herokuapp.com/users/login`, {
          username: username,
          password: password
     })
     .then(resp => {
          console.log(resp.data)
     })
}