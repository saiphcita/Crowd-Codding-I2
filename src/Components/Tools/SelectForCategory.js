import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from 'react-icons-kit';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp'
import { dbUser } from './DataBase.js'

export default class SelectForCategory extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      category: [],
      actualCategory:""
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Category");
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
      if(this.props.actualCategory === 0){
        this.setState({actualCategory:"Sin Seleccionar"})
      }else{
        this.setState({actualCategory:category[this.props.actualCategory]})
      }
    });
  };

  render() {
    var buttonStyle = {
        backgroundColor: "#fff",
        color: "black",
        height: "100%",
        width: "100%",
        border: "0",
        borderRadius: "0",
        padding: "0",
        margin: "0"
    };
    var dropDownS = {
        backgroundColor: "#E4FFF7",
        color:"black",
        height: "auto",
        width: "320px",
        border: "2px solid black",
        borderRadius: "4px"
    };
    var numeroEstadistico = {
        float:"left", 
        color:"black", 
        backgroundColor:"#95FC5A", 
        borderRadius:"3px", 
        width:"40px", 
        textAlign:"center"
    };
    return (
      <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{height:"100%", width:"100%"}}>
        <DropdownToggle caret style={buttonStyle}>
          {this.state.category[this.props.actualCategory]}
        </DropdownToggle>
        <DropdownMenu style={dropDownS}>
          <DropdownItem style={{color:"black"}} header>{"Comentario "+(this.props.numeroDePost+1)}</DropdownItem>
          <DropdownItem disabled>{"Categoría: "+this.state.actualCategory}</DropdownItem>
          <DropdownItem divider />
          {
            this.state.category.map((val, ind) => {
              if(ind === 0){
                return(
                  <DropdownItem key={ind} 
                    onClick={()=>{
                      const refUserCategorySelected = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post/"+this.props.numeroDePost+"/category/")
                      this.setState({actualCategory:this.state.category[ind]})
                      refUserCategorySelected.set(ind)
                    }}>
                      <div style={{float:"left", marginRight:"16px"}}>{val}</div>
                  </DropdownItem>
                )
              }else{
                return(
                  <DropdownItem key={ind} 
                    onClick={()=>{
                      const refUserCategorySelected = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post/"+this.props.numeroDePost+"/category/")
                      this.setState({actualCategory:this.state.category[ind]})
                      refUserCategorySelected.set(ind)
                    }}>
                      <div style={{float:"left", marginRight:"16px"}}>{val}</div>
                      <div style={numeroEstadistico}>{this.props.arrayCategorias[ind]} <Icon size={12} icon={arrowUp}/></div>
                  </DropdownItem>
                )
              }
            })
          }
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}