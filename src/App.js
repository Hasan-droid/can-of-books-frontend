import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import LoginButton from './Loginbutton';
import LogoutButton from './Logoutbutton';
import BestBooks from './BestBooks';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    const {isAuthenticated}=this.props.auth0;
    console.log('app', this.props.auth0);
    return(
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
                { isAuthenticated ?
                
                  <>
                  <BestBooks/>
                 
                  </> :
                  <>
               <LoginButton/>
                </>}
              </Route>
              <Route exact path="/profile">
                <Profile/>
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
