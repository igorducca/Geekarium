import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./screens/Landing"
import Login from "./screens/Login"

export default function Routes() {
     return (
          <div>
               <BrowserRouter>
                    <Switch>
                         <Route path="/" exact component={Landing} />
                         <Route path="/login" component={Login} />
                    </Switch>
               </BrowserRouter>
          </div>
     )
}