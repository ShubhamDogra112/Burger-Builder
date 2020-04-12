import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App';
import {Provider  } from 'react-redux'
import { createStore , applyMiddleware , compose , combineReducers} from 'redux'
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';
import ingredientReducer from './store/reducers/ingredient'

import orderReducer from './store/reducers/orders'
import authReducer from "./store/reducers/auth"


const logger = store=>{
    return next=>{
        return action=>{

            // console.log("Middleware dispatching" +action)
            next(action)

        }
    }
}

const rootReducer = combineReducers({
    ing:ingredientReducer,
    order:orderReducer,
    auth:authReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger , thunk)))


const app = (

    <Provider  store = {store}>

        <BrowserRouter>

            <App />

        </BrowserRouter>



    </Provider>
    
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
