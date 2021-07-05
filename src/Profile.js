import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logoutbutton"
import {Card , ListGroup , ListGroupItem} from 'react-bootstrap';
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
    
          <Card style={{ width: '18rem' }}>
  <Card.Img variant="top"  src={user.picture} alt={user.name} />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
 
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>User name : {user.name} </ListGroupItem>
    <ListGroupItem>User E-mail : {user.email}</ListGroupItem>
 
  </ListGroup>

</Card>
        
    )
  );
};

export default withAuth0(Profile);