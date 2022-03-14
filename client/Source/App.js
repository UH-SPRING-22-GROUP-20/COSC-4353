import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import FuelQuote from './components/FuelQuote';
import OrderHistory from './components/OrderHistory';
import Profile from './components/Profile';
import Dashboard from './components/dashboard';
import profileRequest from './components/ProfileRequest';
import Nav from './components/nav';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {setIsAuthenticated(boolean);}; 

  return (
    
    <Router>
    <div className="App">
    
     
        <Route exact path='/'  render={props => !isAuthenticated ? <Login {...props} setAuth = {setAuth}/> : <Redirect to = "/dashboard" />} />
        <Route path='/login' render={props => !isAuthenticated ? <Login {...props} setAuth = {setAuth}/> : <Redirect to = "/dashboard" />} />
        <Route path='/register'  render={props => !isAuthenticated ? <Register {...props} setAuth = {setAuth} /> : <Redirect to = "/dashboard" />} />
        <Route path='/dashboard'  render={props => isAuthenticated ? <Dashboard {...props} setAuth = {setAuth} /> : <Redirect to = "/login" />} />
        <Route path='/fuelquote'  render={props => isAuthenticated ? <FuelQuote {...props} setAuth = {setAuth} /> : <Redirect to = "/login" />} />
        <Route path='/orderHistory'  render={props => isAuthenticated ? <OrderHistory {...props} setAuth = {setAuth} /> : <Redirect to = "/login" />} />
        <Route path='/profile'  render={props => isAuthenticated ? <Profile {...props} setAuth = {setAuth} /> : <Redirect to = "/login" />} />
        <Route path='/profilerequest' component={profileRequest}/>

    </div>
  </Router>
  );
}

export default App;
