import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email:''
    }

  }
  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims().then(res => {
        const jwt = res.__raw
        let config = {
          headers: { 'Authorization': `Bearer ${jwt}` },
          baseURL: process.env.REACT_APP_SERVER_DOMAIN,
          method: 'get',
          url: '/authorize'
        }
        axios(config).then(respose => {
          console.log("recived Data", respose.data)
        }).catch(err => (console.log(err)))
        

      }).catch(err => (console.log(err)))
    }
    else {
      console.log("hey were her")
    }
  }

  render() {

    let getUserdata=(e)=>{
      this.setState({
         email:e.target.value
      });
    }

 let sendRequest=(e)=>{
   e.preventDefault();
   const booksURL = `${process.env.REACT_APP_SERVER_DOMAIN}/books?email=${this.state.email}`
        axios.get(booksURL).then(res => {
          console.log(res.data)
          if(res.data=='not found' ){
            this.setState({
              books:[{
                name:"not found"
              }]
               
            })
          }
          else{
            this.setState({
          
              books: res.data
  
            })
          }
         
          console.log('books' , this.state.books)
        })
 }
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        
        <form>
          <input type='text' placeholder='email' onChange={(e)=>{getUserdata(e)}}/>
          <button onClick={(e)=>{sendRequest(e)}}>search by email</button>
        </form>
  
        <p>
          This is a collection of my favorite books
        </p>
        
        <ol>
         
        {
          
          this.state.books.map(item => {
            return <li>{item.name}</li>
          })
          
        } 
        
        </ol>
        

      </Jumbotron>
      
    )
  }
}

export default withAuth0(MyFavoriteBooks);
