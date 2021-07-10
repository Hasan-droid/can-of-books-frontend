import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {Card , Button  } from 'react-bootstrap'
import Updatebtn from './Updatebtn';


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email:'',
      bookname:'',
      description:'',
      status:''
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

   getUserdata=(e)=>{
    this.setState({
       email:e.target.value
    });
  }

 sendRequest=(e)=>{
 e.preventDefault();
 const booksURL = `${process.env.REACT_APP_SERVER_DOMAIN}/books?email=${this.state.email}`
      axios.get(booksURL).then(res => {
        console.log(res.data)
        // if(res.data=='not found' ){
        //   this.setState({
        //     books:[{
        //       name:"not found"
        //     }]
             
        //   })
        // }
        // else{
          this.setState({
        
            books: res.data

          })
         
        // }
       
        console.log('books' , this.state.books)
      })
}
getBookName=(e)=>{
  this.setState({
    bookname:e.target.value
  })
}
// addBooks=async(e)=>{
// e.preventDefault();
// const reqBody = {
//   useremail: 'baydoun.net@hotmail.com',
//   bookname:'wars'

 
// }

// console.log(reqBody)
// const results =await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/add-book`, reqBody) 
// console.log('books state data' ,results.data)
//   this.setState({
//      books:results.data
     
//   })

// // .catch(error =>
// //   alert(error.message)
// // )





 
// }

addBooks= async (e)=>{
  e.preventDefault();
  const {user}=this.props.auth0;
  const bookData={
    name:this.state.bookname,
    email:user.email
  }
  console.log(bookData);
  const addBookURL=await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/add-book`,bookData);
  console.log(addBookURL.data);
  this.setState({
    books:addBookURL.data
  })
}

removeBook=async(book_idx)=>{
 
  const {user}=this.props.auth0;
  console.log(book_idx);
  const qureyEmail={
    email:user.email
  }
  const deleteURL=await axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/removebook/${Number(book_idx)}`,{params:qureyEmail});
  console.log(deleteURL);
  this.setState({
    books:deleteURL.data
  })
}

getName=(e)=>{
  e.preventDefault();
  this.setState({
    bookname:e.target.value
  })
}
getDescription=(e)=>{
  console.log(e.target.value);
  e.preventDefault();
  this.setState({
    deccription:e.target.value
  })
}
getStatus=(e)=>{
  e.preventDefault();
  this.setState({
    status:e.target.value
  })
}

updateBookData= async (e,index)=>{
  e.preventDefault();
  console.log(index);
  const {user}=this.props.auth0;
  const bookData={
    name:this.state.bookname,
    description:this.state.description,
    status:this.state.status,
    email:user.email
  }
  console.log(bookData);
  const updateBookURL=await axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/updatebook/${index}`,bookData);
  console.log(updateBookURL.data);
  this.setState({
    books:updateBookURL.data
  })
}
handleModal=(e)=>{
  e.preventDefault();
   {/* <form className="update-form" onSubmit={(e)=>updateBook(e,this.props.index)}>
                            <label>Name:</label>
                            <input type="text" onChange={(e)=>this.getName(e)}></input><br></br>
                            <label>Decription:</label>
                            <input type="text" onChange={(e)=>this.getDescription(e)}></input><br></br>
                            <label>Status:</label>
                            <input type="text" onChange={(e)=>this.getStatus(e)}></input>
                            <br></br>
                            <button type="submit" >Update Book</button>
                        </form> */}
}
  render() {

   

    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        
        <form>
          <input type='text' placeholder='email' onChange={(e)=>{this.getUserdata(e)}}/>
          <button onClick={(e)=>{this.sendRequest(e)}}>search by email</button>
        </form>
        <form>
          <input type='text' placeholder='Book Name' onChange={(e)=>{this.getBookName(e)}}/>
          <button onClick={(e)=>{this.addBooks(e)}}>Add</button>
        </form>
  
        <p>
          This is a collection of my favorite books
        </p>
        
       
         <ol>
        {this.state.books.length!==0 &&
          
          this.state.books.map((item , indx) => {
            return    <>
            <Card className='cardBook' key={indx} id={indx}>
              <Card.Body >
                <Card.Title>Book name: {item.name}</Card.Title>
                <Card.Text>Description: {item.description}</Card.Text>
                <Card.Text>Status: {item.status}</Card.Text>
              </Card.Body>
              <Card.Footer>
              <Button variant="danger" onClick={(e)=>this.removeBook(indx)}>Delete</Button>
                 <div className="space"></div>
                         <div className="space"></div>
              <Updatebtn key={indx} id={indx}
                getNm={this.getName}
                getStatus={this.getStatus}
                getDesc={this.getDescription}
                updateBook={this.updateBookData}
                indx={indx}
                bookName= {item.name}
              />
              </Card.Footer>
              </Card>
            </>



          })
          
        } 
        </ol>
       
        

      </Jumbotron>
      
    )
  }
}

export default withAuth0(MyFavoriteBooks);
