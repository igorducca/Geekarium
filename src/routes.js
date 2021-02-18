import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./screens/Landing";
import UserConception from "./screens/UserConception";

export default function Routes() {
     return (
          <div>
               <BrowserRouter>
                    <Switch>
                         <Route path="/" exact component={Landing} />
                         <Route path="/user/final/:id/:remeber" component={UserConception} />
                    </Switch>
               </BrowserRouter>
          </div>
     )
}