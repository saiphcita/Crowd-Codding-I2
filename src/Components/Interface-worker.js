import React, { Component } from 'react';
import './Interface-worker.css';
import { Collapse, Button} from 'reactstrap';
import ModalExample  from './modal.js'
import { Link } from 'react-router-dom';

import { refGeneralCategory, dbUser, refAllUsers} from './DataBase.js'


class EmailBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: []
    };
  }

  componentDidMount(){
    refAllUsers.on("value", (snapshot) => {
        let AllUsers = snapshot.val();
        let listOfUsers = AllUsers.map(val => {return val.User.UserInfo.Username})
        this.setState({listUsers: listOfUsers})
    });
  }

  render(){
    return (
      <header className="Bar-header">
        <div >{this.state.listUsers[this.props.numberUser]}</div>
        <Link to="/">
        <div className="ButtonLogOut">Log Out</div>  
        </Link>    
      </header> 
    );
  }
}


class AsideBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      collapse: false,
      category: [],
    };
  }

  componentDidMount() {
    refGeneralCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="aside">
        <Collapse isOpen={this.state.collapse} className="collapseEstilo">
            <Button color="primary" onClick={this.toggle} className="buttonBack">Go Back</Button>
            <div className="DivDefinition">
              <ul className="listDefiniton">
                <li className="tittleList">Category</li>
                {this.state.category.map(i => {
                  return <li key={i.categoryName}>
                    {i.categoryName}
                  </li>
                })}
              </ul>
              <ul className="listDefiniton">
                <li className="tittleList">Definition</li>
                {this.state.category.map(i => {
                  return <li key={i.categoryName}>
                    {i.categoryDefinition}
                  </li>
                })}
              </ul>
            </div>
        </Collapse>
      <div className="ShowTx">
      <div>Show the definition of the categories.</div>
      <Button color="primary" onClick={this.toggle} style={{marginTop: "20px"}}>Show</Button>
      </div>
    </div>
    );
  }
}


class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      value: [],
      category: [],
      listUsers: []
    };
  }

  componentDidMount() {
    var refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
    var refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Category");

    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
      this.setState({value: posts.map(val => {return val.category})})
   });
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
    refAllUsers.on("value", (snapshot) => {
      let AllUsers = snapshot.val();
      this.setState({listUsers: AllUsers})

      let PostOfUser = AllUsers.map( val => val.User.PostAndCategory.Post)
      this.setState({PostOfUser: PostOfUser})
  });
  }


  saveChange(){
    var refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
    let newPost = this.state.post;
    for (let i = 0; i < newPost.length; i++) { 
      newPost[i].category = this.state.value[i]
    }
    this.setState({post: newPost});
    refUserPost.set(this.state.post)
  }


  render() {
    return (
      <div>
        <Button outline color="success" className="buttonSave" onClick={()=>this.saveChange()}>Save Changes</Button>
        <div className="DivPostCategory">
              <ul className="listPost">
                <li className="tittleListPC">Post</li>
                  {this.state.post.map((val, i) => {
                    if(val.post.length > 92){
                      return <li key={i}>
                        {val.post.substring(0,92)}... 
                        <ModalExample 
                        ButtonName={"Show More"}
                        post={val.post} 
                        ind={i+1} 
                        styleB="buttonChange buttonShow"
                        />
                      </li>
                    }else{
                      return <li key={i}>
                        {val.post}
                      </li>
                    }
                  })}
              </ul>
              <ul className="listCategory">
                <li className="tittleListPC">Category</li>
                  {this.state.post.map((val, i) => { 
                    return <li key={i}>
                        <SelectCategory
                        id={i}
                        listCategory={this.state.category}
                        categoryValue={this.state.value[i]}
                        handleChange={(event) =>{
                          let newValue = this.state.value.slice();
                          newValue[i] = event.target.value;
                          this.setState({value: newValue});
                        }}
                        />
                      </li>
                    })}
              </ul>
              <ul className="listStatistics">
                <li className="tittleListPC">Statistics of each Post</li>
                  {this.state.post.map((val, indexPost) => {
                    //This is for the button Show Statistics
                    let ArrayValores = this.state.PostOfUser.map(val => parseInt(val[indexPost].category, 10));
                    var Postvalores = [];
                    for (let i = 0; i < ArrayValores.length; i++) {
                      if(ArrayValores[i] > 0){
                        Postvalores.push(ArrayValores[i])
                      }
                    }
                    let TotalValores = Postvalores.length
                    var percentage = {};
                    for (let i = 0; i < TotalValores; i++) {
                      percentage[Postvalores[i]] = percentage[Postvalores[i]] ? Number(percentage[Postvalores[i]]) + 1 : 1;
                    }
                    for (let key in percentage) {
                    percentage[key] = (percentage[key] / TotalValores) * 100;
                    }

                    return <li className="LIstatistics" key={indexPost}>
                        <ModalExample
                        ButtonName={"Show Statistics"}
                        post={"Users have selected the following Categories:"}
                        ind={indexPost+1} 
                        styleB="ButtonStyleStadistics"
                        estadistica={
                          Object.keys(percentage).map((key, index) => {
                            return <li key={index}>{this.state.category[key]+" with the percentage of: "+percentage[key]+"%"}</li>                   
                        })
                        }/>
                      </li>
                    })}
              </ul>
        </div>
      </div>
    );
  }
}

class SelectCategory extends Component {
  render() {
    return (
      <div>
        <select id={this.props.id} value={this.props.categoryValue} onChange={this.props.handleChange}>
          {this.props.listCategory.map((val, i) => {
            return <option key={i} value={i}>
              {val}
            </option>
          })}
        </select>
      </div>
    );
  }
}

function  WorkerPage (props) {
  return (
      <div className="divAPC">
        <EmailBar numberUser={props.user}/>
        <AsideBar/>
        <PostAndCategory numberUser={props.user}/>
      </div>
  );
}

export default WorkerPage;