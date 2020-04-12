import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import './Auth.css';
import Spinner from '../../components/ui/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address'
				},
				value: ''
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: ''
			}
		},
		isSignUp: true
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value
			}
		};
		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();

		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.props,
			this.state.isSignUp
		);
	};

	switchAuthMode = () => {
		this.setState((prevState) => {
			return { isSignUp: !prevState.isSignUp };
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = <p>{this.props.error}</p>;
		}

		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated ) {

			if(this.props.building){
			authRedirect = <Redirect to="/checkout" />;


			}
			else{
			authRedirect = <Redirect to="/" />;
			}
		}

		return (
			<div className="Auth">
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="success" clicked={this.submitHandler}>
						Submit
					</Button>
					<Button btnType="danger" clicked={this.switchAuthMode}>
						Switch to {this.state.isSignUp ? 'signin' : 'signup'}
					</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated:state.auth.token !== null , 
		building :state.ing.building
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, props, isSignUp) => dispatch(actions.auth(email, password, props, isSignUp))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
