import * as actionTypes from './actionTypes'


export const add_ingredient = (igName)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredient_name:igName

    }
}


export const remove_ingredient = (igName)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredient_name:igName

    }
}