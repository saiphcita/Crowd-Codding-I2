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
            <li style={{width:"75%", maxWidth:"75%"}}>Comentario</li>
            <li style={{width:"22%", maxWidth:"22%"}}>Categoría</li>
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


            // //esto es Select Category y Estadistica
            // var todasLasCategorias = {}
            // for (let i = 0; i < this.state.category.length; i++) {
            //   todasLasCategorias[i] = 0
            // };
            // let ArrayValores = this.state.PostOfUser.map(val => Number(val[ind].category));
            // var Postvalores = [];
            // for (let i = 0; i < ArrayValores.length; i++) {
            //   if(ArrayValores[i] > 0){ Postvalores.push(ArrayValores[i]) };
            // };
            // let TotalValores = Postvalores.length
            // var percentage = {};
            // for (let i = 0; i < TotalValores; i++) { percentage[Postvalores[i]] = percentage[Postvalores[i]] ? Number(percentage[Postvalores[i]]) + 1 : 1 }; 
            // for (let i = 0; i < this.state.category.length; i++) {
            //   if(percentage[i] !== undefined){
            //     todasLasCategorias[i] = percentage[i]
            //   }
            // };
            // //Aqui termina lo de Select Category y Estadistica