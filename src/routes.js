import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./screens/Landing"

export default function Routes() {
     return (
          <div>
               <BrowserRouter>
                    <Switch>
                         <Route path="/" exact component={Landing} />
                    </Switch>
               </BrowserRouter>
          </div>
     )
}