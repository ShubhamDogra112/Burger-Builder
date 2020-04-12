import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, } from 'mdbreact';

class ModalPage extends Component {


render() {
  return (
    <MDBContainer>
      

      <MDBModal isOpen={this.props.show} toggle = {this.props.modalClosed}>

        <MDBModalHeader toggle={this.toggle}>Error Message</MDBModalHeader>
        <MDBModalBody>
          {this.props.children}
        </MDBModalBody>
        
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalPage;