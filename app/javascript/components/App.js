import React from "react"
import PropTypes from "prop-types"

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Forms from './Forms';
import ShowForm from "./ShowForm";
import EditForm from './EditForm';
import NewForm from './NewForm';
import Responses from './Responses'
import ShowResponse from './ShowResponse'

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/forms" render={()=><Forms/>} />
            <Route exact path="/forms/new" render={()=><NewForm/>} />
            <Route exact path="/forms/:id" component={ShowForm} />
            <Route exact path="/forms/:id/edit" component={EditForm} />
            <Route exact path="/forms/:id/responses" component={Responses} />
            <Route exact path="/forms/:id/responses/:res_id" component={ShowResponse} />
            <Redirect from="/" to="/forms" />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App
