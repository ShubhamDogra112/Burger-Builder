import React from 'react';

import Burger from '../../../Burger/Burger';
import Button from '../../../ui/Button/Button';
import './CheckoutSummary.css';
import Aux from '../../../../hoc/wrapper'




const checkoutSummary = (props) => {

    let buttons = (
        <Aux>
        <Button 
        btnType="danger"
        clicked = {props.cancel}>CANCEL</Button>
        <Button 
        btnType="success"
        clicked = {props.continue}>CONTINUE</Button>
        </Aux>

       

      
    )

    if(props.show){
        buttons = null
    }
    
    return (
        <div className='CheckoutSummary'>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
           {buttons}
        </div>
    );
}

export default checkoutSummary;