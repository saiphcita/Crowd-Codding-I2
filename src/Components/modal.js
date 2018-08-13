import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Interface-worker.css';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {

    var divStadistic = null
    var divPost = <div style={{marginBottom:"8px"}}>{this.props.post}</div>

    if(Array.isArray(this.props.estadistica)){
      if (this.props.estadistica.length === 0) {
        divStadistic = "No user has selected a category in this post"
        divPost = <div/>
      }else{
        divStadistic = this.props.estadistica
      }
    }else{
      divStadistic = ""
    }

    return (
      <div className="divShowMore">
        <button color="info" onClick={this.toggle} className={this.props.styleB}>{this.props.ButtonName}</button>
        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 350 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Post Number {this.props.ind}</ModalHeader>
          <ModalBody>
              {divPost}
              {divStadistic}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Go Back</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;