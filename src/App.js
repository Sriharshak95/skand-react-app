import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ListUser from './listuser';
import UserDetail from './userdetail';
import CreateUser from './createuser';
import PrivateRoute from './privateroute';
import { authUser } from './reduximp/action';
import { useSelector, useDispatch } from 'react-redux';
import cookie from './cookie';

function App() {
  const authtoken = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(cookie.get('authorization')){
      dispatch(authUser(true));
    }
    else{
      dispatch(authUser(false));
    }
  },[dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authtoken?<Redirect to="/home"/>:<Login/>}
        </Route>
        <PrivateRoute exact path="/user/:id" component={UserDetail} auth={authtoken} />
        <PrivateRoute exact path="/createuser" component={CreateUser} auth={authtoken} />
        <PrivateRoute exact path="/home" component={ListUser} auth={authtoken} />
      </Switch>
    </Router>
  );
}

export default App;
