import * as actionTypes from './actionTypes'
import axios from 'axios'



export const auth_start = ()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const authLogout = ()=>{

    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')

    return {

        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (time)=>{
    return dispatch=>{
        setTimeout(() => {
            dispatch(authLogout())
            
        }, time*1000);
    }

}


export const authFail = (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const auth = (email ,password , props , isSignUp)=>{
    return dispatch=>{
        dispatch(auth_start())

        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRokAwLPY0YHD-y10zx9zK6-kxOADV8NA '

        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRokAwLPY0YHD-y10zx9zK6-kxOADV8NA'
            
        }

        axios.post(url, authData)

        .then(response=>{
            
            let token = response.data.idToken
            let userId = response.data.localId

            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn *1000)
            localStorage.setItem('token' , token)
            localStorage.setItem('expirationDate',expirationDate )
            localStorage.setItem('userId' , userId)

            dispatch(authSuccess(token , userId))
            dispatch(checkAuthTimeout(response.data.expiresIn))

        })

        .catch(err=>{

            console.log(err.response.data.error.message)
            dispatch(authFail(err.response.data.error.message))
        })

    } 
}

export const authCheck = ()=>{

    return dispatch=>{

        const token =  localStorage.getItem('token')

    const expirationDate = new Date(localStorage.getItem('expirationDate'))

    const userId = localStorage.getItem('userId')

    if(!token){

        console.log("first")

        dispatch(authLogout())
    }

    else if(expirationDate > new Date()){

        dispatch(authSuccess(token,userId))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        
    }

    else{
        console.log("second")
        dispatch(authLogout())
    }





    }

    

}