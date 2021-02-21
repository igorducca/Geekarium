import React from "react";
import { useCookies } from "react-cookie";

import LoggedRead from "./Ler/LoggedRead"
import DefaultRead from "./Ler/DefaultRead"

export default function Ler() {

     const [cookies, setCookie] = useCookies(["gkid"]);

     if(!cookies.gkid) {
          return (
               <DefaultRead />
          )
     }
     else {
          return (
               <LoggedRead />
          )
     }
}