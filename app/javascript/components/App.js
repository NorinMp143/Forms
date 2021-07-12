import React from "react"
import PropTypes from "prop-types"

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Forms from './Forms';
import ShowForm from "./ShowForm";

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/forms" render={()=><Forms/>} />
            <Route exact path="/forms/:id" component={ShowForm} />
            <Redirect from="/" to="/forms" />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App
