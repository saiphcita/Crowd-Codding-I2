import React, { Component } from 'react';
import './CSS/PostAndCategory.css';
import SelectForCategory  from '../Components/Tools/SelectForCategory.js'
import { dbUser, refAllUsers } from './Tools/DataBase.js'

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      category: [],
      heightPC: "100%"
    };
  }

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post");    
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
      // var arrayxx = posts
      // for (let i = 0; i < posts.length; i++) { 
      //   arrayxx[i].category = 0;
      // };
      // refUserPost.set(arrayxx);
    });

    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Category");
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });

    refAllUsers.on("value", (snapshot) => {
      let AllUsers = snapshot.val();
      let PostOfUser = AllUsers.map( val => val.PostAndCategory.Post)
      this.setState({PostOfUser: PostOfUser})
    });
  };

  render() {
    return (
      <div style={{height:"92%", textAlign:"center"}}>
        <div className="DivPostCategory" style={{height:this.state.heightPC, maxHeight:this.state.heightPC}}>
          <div className="titleList">
            <li style={{width:"3%", maxWidth:"3%", padding:"0"}}>No.</li>
            <li style={{width:"75%", maxWidth:"75%"}}>Post</li>
            <li style={{width:"22%", maxWidth:"22%"}}>Category</li>
          </div>
          {this.state.post.map((val, ind) =>{
            //esto es Select Category y Estadistica
            var todasLasCategorias = this.state.category
            todasLasCategorias = Object.keys(todasLasCategorias).map((val)=>{return val})
            const refUserCategorySelected = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post/"+ind+"/category/")
            //Aqui termina lo de Select Category y Estadistica
            return (
              <div key={ind} className="NCClist">
                <li key={ind} style={{width:"3%", maxWidth:"3%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                <li key={val.post} style={{width:"75%", maxWidth:"75%"}}>{val.post}</li>
                <li style={{width:"22%", maxWidth:"22%", padding:"0", margin:"0"}}>
                  {/* <SelectForCategory arrayCategorias={todasLasCategorias} numeroDePost={ind} actualCategory={this.state.post[ind].category} numberUser={this.props.numberUser}/> */}
                  <SelectForCategory saveCategory={refUserCategorySelected} categorias={todasLasCategorias} numberP={ind} actual={this.state.post[ind].category}/>
                </li>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default PostAndCategory;