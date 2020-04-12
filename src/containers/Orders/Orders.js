import React, { Component } from 'react';

import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders';
import {connect} from "react-redux"
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.fetchOrdersHandler(this.props.token ,this.props.userId)
       
    }

    

    fetchOrdersHandler = (token ,userId)=>{

        const params = '?auth='+token+'&orderBy="userId"&equalTo="' +userId + '"'
    
        axios.get('/orders.json'+params)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });

    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return {
        token:state.auth.token , 
        userId:state.auth.userId
    }
}

export default connect(mapStateToProps,null)(withErrorHandler(Orders, axios));