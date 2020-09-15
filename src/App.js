import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useHistory
  
} from "react-router-dom";

// context
import {MainProvider} from 'context/freeseContext'

// lib
// components
import Nav from 'components/nav'
// router
import Home from 'router/home'
import Details from 'router/detail'
import Shop from 'router/shop'
import Shoppingchart from 'router/shoppingchart'
import Mypage from 'router/mypage'



function App() {


 
  
  return (
    <MainProvider>
      <Router>
        <Nav/>
        <Switch>
          <Route path='/' exact><Home/></Route>
          <Route path='/item/:id'><Details/></Route>
          <Route path='/shop/:id'><Shop/></Route>
          <Route path='/shoppingchart'><Shoppingchart/></Route>
          <Route path='/my'><Mypage/></Route>
        </Switch>
      </Router>
    </MainProvider>
  );
}

export default App;
