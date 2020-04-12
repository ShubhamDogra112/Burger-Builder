import * as actionTypes from '../actions/actionTypes'


const initialState = {
    ingredients:{
        meat:0,
        bacon:0,
        salad:0,
        cheese:0
    },
    totalPrice:4,
    building:false
}

const IngredientPrice = {
    meat:1.5,
    bacon:0.8,
    cheese:0.6,
    salad:0.5

}


const reducer = (state = initialState, action)=>{

    switch(action.type){

        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredient_name]:state.ingredients[action.ingredient_name]+1
                },

                totalPrice:state.totalPrice  + IngredientPrice[action.ingredient_name],
                building:true
            }

        case actionTypes.REMOVE_INGREDIENT:
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredient_name]:state.ingredients[action.ingredient_name]-1
                    },

                price:state.totalPrice  - IngredientPrice[action.ingredient_name],
                building:false

                }

        default:
            return state



    }
    

}


export default reducer