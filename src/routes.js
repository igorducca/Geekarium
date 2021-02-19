import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./screens/Landing";
import UserConception from "./screens/UserConception";
import Publicar from "./screens/Publicar";
import Ler from "./screens/Ler";

export default function Routes() {
     return (
          <div>
               <BrowserRouter>
                    <Switch>
                         <Route path="/" exact component={Landing} />
                         <Route path="/user/final/:id/:remeber" component={UserConception} />
                         <Route path="/publi" component={Publicar} />
                         <Route path="/ler/:name" component={Ler} />
                    </Switch>
               </BrowserRouter>
          </div>
     )
}