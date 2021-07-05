import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
 componentDidMount=()=>{
   if(this.props.auth0.isAuthenticated){
     this.props.auth0.getIdTokenClaims().then(res=>{
       const jwt=res.__raw
      let config={
         headers:{'Authorization':`Bearer ${jwt}`},
         baseURL:process.env.REACT_APP_SERVER_DOMAIN,
         method:'get',
         url:'/authorize'
       }
      axios(config).then(respose=>{
        console.log("recived Data",respose.data)
      }).catch(err=>(console.log(err)))
     }).catch(err=>(console.log(err)))
   }
   else{
    console.log("hey were her")
  }
 }
 
  render() {
    

    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
