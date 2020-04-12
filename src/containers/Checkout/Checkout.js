import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './contact-form/contactForm'
import {connect} from 'react-redux'



class Checkout extends Component {
    state = {

            showForm:false,
            
        }
    

 

    checkoutContinueHandler = ()=>{
        this.setState({
            showForm:true
        })
        this.props.history.replace("/checkout/contact-data")



    }


    checkoutCancelHandler = ()=>{

        this.props.history.goBack()


    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}
                
                continue = {this.checkoutContinueHandler}

                cancel = {this.checkoutCancelHandler}

                show= {this.state.showForm}
                
                />

                <Route  path = {this.props.match.path  + '/contact-data'   }  render ={()=><ContactForm  ingredients = {this.props.ingredients} price = {this.props.totalPrice} />}      />
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return{
        ingredients:state.ing.ingredients,
        totalPrice:state.ing.totalPrice
    }
}


export default connect(mapStateToProps)(Checkout);