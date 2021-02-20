import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./screens/Landing";
import UserConception from "./screens/UserConception";
import Publicar from "./screens/Publicar";
import Ler from "./screens/Ler";
import Follow from "./screens/Follow";
import Perfil from "./screens/Perfil";

export default function Routes() {
     return (
          <div>
               <BrowserRouter>
                    <Switch>
                         <Route path="/" exact component={Landing} />
                         <Route path="/user/final/:id/:remeber" component={UserConception} />
                         <Route path="/publi" component={Publicar} />
                         <Route path="/ler/:name" component={Ler} />
                         <Route path="/follow/:user" component={Follow} />
                         <Route path="/perfil/:user" component={Perfil} />
                    </Switch>
               </BrowserRouter>
          </div>
     )
}