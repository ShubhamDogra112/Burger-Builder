import axios from '../../axios-orders'
import * as actionTypes from './actionTypes'


export const purchase_burger_start = ()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchase_burger_success = (id,order_data)=>{
    return{

        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:order_data

    }
}

export const purchase_burger_fail = (error)=>{
    return{

        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error

    }
}

export const purchase_burger = (orderdata , props , token)=>{

    return dispatch=>{

        dispatch(purchase_burger_start())

        axios
			.post('/orders.json?token='+token, orderdata)
			.then((response) => {
				
                dispatch(purchase_burger_success(response.data,orderdata))
                props.history.push("/")

			
			})
			.catch((err) => {

                dispatch(purchase_burger_fail(err))
				
			});
    }

}