import React, { Component } from 'react';

import Instrucciones  from '../Components/Instrucciones.js'
import NavBar  from '../Components/NavBar.js'
import AsideBar  from '../Components/AsideBar.js'
import PostAndCategory  from '../Components/PostAndCategory.js'

class WorkerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statePage: 1
    };
  }

  changeState() { this.setState({ statePage: 1 }) };

  render() {
    var Page = <div/>

    if(this.state.statePage === 0){
      Page = <Instrucciones button={<button onClick={this.changeState.bind(this)}>Entendido</button>}/>
    }else if(this.state.statePage === 1){
      Page = <div style={{height:"100%"}}><NavBar numberUser={this.props.user}/><AsideBar/><PostAndCategory numberUser={this.props.user}/></div>
    };

    return Page
  }
}

export default WorkerPage;