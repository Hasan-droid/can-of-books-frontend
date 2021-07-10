import React, { Component } from 'react'
import {Card , Button , Modal  } from 'react-bootstrap'

 class Updatebtn extends Component {
   
            constructor(props) {
                super(props);
                this.state = {
                    show: false
                }}
        
            showModal(){
                this.setState({show:!this.state.show})
            }
        
            render() {
                return (
                    <div>
                        <Button variant="warning" onClick={()=>{this.showModal()}}>Update</Button>
                        <Modal show={this.state.show} onHide={()=>this.showModal()}>
                            <Modal.Header closeButton>{this.props.bookName}</Modal.Header>
                            <Modal.Body>
                                <form className="update-form" onSubmit={(e)=>this.props.updateBook(e,this.props.indx)}>
                                    <label>Name:</label>
                                    <input type="text" onChange={(e)=>this.props.getNm(e)}></input><br></br>
                                    <label>Decription:</label>
                                    <input type="text" onChange={(e)=>this.props.getDesc(e)}></input><br></br>
                                    <label>Status:</label>
                                    <input type="text" onChange={(e)=>this.props.getStatus(e)}></input>
                                    <br></br>
                                    <button type="submit" onClick={()=>{this.showModal()}}>Update</button>
                                </form>
                            </Modal.Body>
                    </Modal>
                    </div>
                )
            }
        
    }


export default Updatebtn
