import React,{Component} from 'react'
import Aux from '../../hoc/wrapper'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/ui/Modal/Modal'

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import axios from '../../axios-orders'

import {connect} from 'react-redux'

import Spinner from '../../components/ui/Spinner/Spinner'

import errorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import * as burgerIngredients from '../../store/actions/index'


// const IngredientPrice = {
//     meat:1.5,
//     bacon:0.8,
//     cheese:0.6,
//     salad:0.5

// }

class Burgerbuilder extends Component{



    state = {
        // ingredients:{
        //     meat:0,
        //     bacon:0,
        //     salad:0,
        //     cheese:0

        // },
        // totalPrice:4,
        // purchasable:false,
        order:false,
        showLoader:false,
        
        
       
    }

  


    purchaseHandler = ()=>{

        if(this.props.isAuthenticated){

            this.setState({
                order:true
            })
        }

        else{
            this.props.history.push("/auth")
        }
       
    }

    purchaseCancelHandler = ()=>{
        this.setState({
            order:false
        })
    }

    purchaseContinueHandler = ()=>{

        this.props.history.push({
            pathname:"/checkout"
        })





    }

    updatePurchaseState (ingredients){
        

        let sum  = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey]
            })
            .reduce((sum,el)=>{
                return sum+el;

            },0)

           return sum>0
            
    }


    // addIngredientListener = (type)=>{

    //     let oldCount = this.state.ingredients[type]
    //     let newCount = oldCount+1
    //     let updatedIngredients = { ...this.state.ingredients}

    //     updatedIngredients[type] = newCount
    //     let priceAddition =  IngredientPrice[type]
    //     let newPrice = this.state.totalPrice + priceAddition
        
    //     this.setState({ totalPrice:newPrice , ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)



    // }

    // removeIngredientListener = (type)=>{

    //     let oldCount = this.state.ingredients[type]
    //     if(oldCount <=0){
    //         return
    //     }
    //     let newCount = oldCount-1
    //     let updatedIngredients = { ...this.state.ingredients}

    //     updatedIngredients[type] = newCount
    //     let priceAddition =  IngredientPrice[type]
    //     let newPrice = this.state.totalPrice - priceAddition
        
    //     this.setState({ totalPrice:newPrice , ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)



    // }


    render() {


       

        


        const disabledInfo = { ...this.props.ingredients}

        for( let key in disabledInfo) {

        disabledInfo[key]  = disabledInfo[key] <=0


        }


        let orderSummary = <OrderSummary  ingredients ={this.props.ingredients} purchaseCancelled = {this.purchaseCancelHandler}
                    
        purchaseContinued = {this.purchaseContinueHandler}

        price={this.state.totalPrice}
        
        />
        if(this.state.showLoader){
            orderSummary = <Spinner/>
        }

        


        return (
            <Aux>

                <Modal  show = {this.state.order}  modalClosed = {this.purchaseCancelHandler} >

                {orderSummary}
                    

                    
                </Modal>

                <Burger  ingredients = {this.props.ingredients} />

                
                
                <BuildControls   
                 addIngredients = {this.props.addIngredient} 
                removeIngredientListener = {this.props.removeIngredient}
                price = {this.props.totalPrice}
                disabled = {disabledInfo}
                purchasable = {this.updatePurchaseState(this.props.ingredients)}
                ordered = {this.purchaseHandler}

                isAuth = {this.props.isAuthenticated}
                
                />
                
            </Aux>
        )
    }
}


const mapStateToProps = state=>{
    return{
        ingredients:state.ing.ingredients,
        totalPrice:state.ing.totalPrice,
        isAuthenticated : state.auth.token !== null
    }
}


const mapDispatchToProps = dispatch=>{
    return{
        addIngredient:(igName)=>dispatch(burgerIngredients.add_ingredient(igName)),
        removeIngredient:(igName)=>dispatch(burgerIngredients.remove_ingredient(igName))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(Burgerbuilder,axios))