import React from 'react';

import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className='BuildControls'>
        <p>Total price: <strong>{props.price}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added = {()=>props.addIngredients(ctrl.type)}
                
                removed = {()=>props.removeIngredientListener(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}                
                
                />
        ))}

        <button className = "OrderButton" onClick ={props.ordered}  disabled = {!props.purchasable} >
          { props.isAuth? 'ORDER NOW' :'Sign  up To Continue'  }
        </button>
    
    </div>
);

export default buildControls;