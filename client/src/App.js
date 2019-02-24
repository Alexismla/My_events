import React, { Component } from 'react';
import HomePage from './HomePage';
import EventPage from './EventPage'
import { BrowserRouter,Switch,Route } from 'react-router-dom';
class App extends Component {


  render() {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path='/Home' component={HomePage}/>
            <Route path='/Event/:id' component={EventPage}/>
        </Switch>
      </BrowserRouter>
);
  
  }
}

export default App;
