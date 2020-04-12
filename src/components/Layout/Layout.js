import React , {Component} from 'react';

import Aux from '../../hoc/wrapper';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import {connect} from "react-redux"
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {


    state = {
        sidedrawerShow :false
    }

    sidedrawerCloseHandler = ()=>{
        this.setState({
            sidedrawerShow:false
        })
    }

    sidedrawerToggleHandler = ()=>{
     let show = this.state.sidedrawerShow

     this.setState({
         sidedrawerShow :!show
     })
    }

    render() {
        return (

            <Aux>
            <Toolbar    isAuth = {this.props.isAuthenticated}  drawerToggleClicked = {this.sidedrawerToggleHandler}   />
            <SideDrawer  isAuth  = {this.props.isAuthenticated}   open = {this.state.sidedrawerShow}      closed = {this.sidedrawerCloseHandler}  />
            <main className='Content'>
                {this.props.children}
            </main>
        </Aux>
            
        )
    }
   
};

const mapStateToProps = state=>{
    return{
        isAuthenticated:state.auth.token !== null

    }
}

export default connect(mapStateToProps,null)(Layout);