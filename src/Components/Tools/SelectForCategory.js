import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from 'react-icons-kit';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp'

export default class SelectForCategory extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      actualCategory: "",
      categoriasPopularty: {},
      arrayCategories: []
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    this.setState({actualCategory: this.props.actual})

    var anObject = {}
    for(let i = 0; i < this.props.categorias.length; i++){
      anObject[this.props.categorias[i]] = 0
      if(this.props.popularity[this.props.categorias[i]] !== undefined){
        anObject[this.props.categorias[i]] = this.props.popularity[this.props.categorias[i]]
      }
    }
    this.setState({categoriasPopularty: anObject})
    var arrayCategories = Object.keys(anObject).sort((b,a)=>{return anObject[a]-anObject[b]})
    this.setState({arrayCategories: arrayCategories})
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
      <div style={{height:"100%", width:"100%"}}>
         <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{height:"100%", width:"100%"}}>
          <DropdownToggle caret style={buttonStyle}>
            {this.state.actualCategory}
          </DropdownToggle>
          <DropdownMenu style={dropDownS}>
            <DropdownItem style={{color:"black"}} header>{"Comentario "+(this.props.numberP+1)}</DropdownItem>
            <DropdownItem disabled>{"Categoría: "+this.state.actualCategory}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem key={0} onClick={()=>{this.setState({actualCategory:"Select Category"}); this.props.saveCategory.set("Select Category")}}>
              <div style={{float:"left", marginRight:"16px"}}>Select Category</div> 
            </DropdownItem>
            {
              this.state.arrayCategories.map((val, ind) => {
                return(
                  <DropdownItem key={ind} onClick={()=>{this.setState({actualCategory:val}); this.props.saveCategory.set(val)}}>
                      <div style={{float:"left", marginRight:"16px"}}>{val}</div> 
                      <div style={numeroEstadistico}>{this.state.categoriasPopularty[val]} <Icon size={12} icon={arrowUp}/></div>
                  </DropdownItem>
                )
              })
            }
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}