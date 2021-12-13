import React from "react"
import PropTypes from "prop-types"

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './styles/App.scss';
import Forms from './Forms';
import ShowForm from "./ShowForm";
import EditForm from './EditForm';
import NewForm from './NewForm';
import Responses from './Responses'
import ShowResponse from './ShowResponse'
import Preview from './Preview'

class App extends React.Component {

  async getUser() {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const response = await fetch('http://localhost:3000/static/user_details',{
      method: 'post',
      headers:{
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      }
    });
    const res = await response.json();
    localStorage.setItem('user_id', res.id )
  }

  componentDidMount(){
    this.getUser(); 
  }

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
            <Route exact path="/forms/:id/preview" component={Preview} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App
