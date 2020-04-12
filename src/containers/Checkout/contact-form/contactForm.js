import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Errorhandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import './ContactData.css';

import {connect} from 'react-redux'

import * as action from '../../../store/actions/index'


class Contactform extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
                value: '',
    
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
                value: '',
               
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
                value: '',
                
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
                value: '',
               
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
                value: '',
                
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: ''
			}
		},
		// loading: false
	};

	submitOrderHandler = (event) => {
		event.preventDefault();

		// this.setState({ loading: true });

		this.props.onOrderStart()


		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
			userId:this.props.userId
		};

		this.props.onOrder(order , this.props , this.props.token )

		
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		this.setState({ orderForm: updatedOrderForm });
	};
	render() {


		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		
		
        

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="success" clicked={this.submitOrderHandler}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loader) {
			form = <Spinner />;
		}
		return (
			<div className="ContactData">
				
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}



const mapStateToProps = state=>{
	return{
		loader:state.order.loading,
		token:state.auth.token , 
		isAuthenticated:state.auth.token !==null,
		userId:state.auth.userId
	}
}


const mapDispatchToProps = dispatch=>{
	return{
	onOrder:(orderData,props , token)=>dispatch(action.purchase_burger(orderData,props , token)),

	onOrderStart:()=>dispatch(action.purchase_burger_start())

	}

}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Errorhandler(Contactform, axios)));
