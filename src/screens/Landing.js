import React from "react";
import { useCookies } from "react-cookie";

import LoggedLanding from "./Landing/Logged-Landing"
import DefaultLanding from "./Landing/Default-Landing"

export default function Landing() {

     const [cookies, setCookie] = useCookies(["gkid"]);

     if(!cookies.gkid) {
          return (
               <DefaultLanding />
          )
     }
     else if (cookies.gkid) {
          return (
               <LoggedLanding />
          )
     }
}