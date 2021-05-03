import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Reviews from './components/Reviews'
import CrudReviews from './components/CrudReviews'
import './App.css';
import {connect} from 'react-redux'

function App({user, history}) {

  React.useEffect(() => {
    if(!user){
      history.push("/login")
    }
  },[user, history])

  return (
     <div className="">
      <Navbar/>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        { user && (
          <>
            <Route component={Reviews} path="/reviews"/>
            <Route component={CrudReviews} path="/myreviews"/>
          </>
        )}
        
      </Switch>
     </div>
  );
}

const mapStoreProps = (store) => {
  return {
      user: store.user.usuario
  }
}

export default connect(mapStoreProps)(withRouter(App));
