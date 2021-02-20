import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Follow() {

     const [cookies, setCookie] = useCookies(["gkid"]);
     let { user } = useParams();

     useEffect(() => {

          axios.get(`https://geekarium.herokuapp.com/uses/get/cookie/${cookies.gkid}`)
          .then(resp => {
               axios.get(`https://geekarium.herokuapp.com/users/follow/${resp.data.data.userId}/${user}`)
               .then(respp => {
                    console.log(respp.data)

                    if(respp.data.sucesso == true) return window.location.href = "/"
               })
          })
     }, [])

     return (
          <p>Seguindo @{user}...</p>
     )
}