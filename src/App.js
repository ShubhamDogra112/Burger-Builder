import React , {Component , Suspense} from 'react';
import {Route, Switch , Redirect} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Burgerbuilder from './containers/burgerBuilder/burgerBuilder'
import Checkout from './containers/Checkout/Checkout'
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth'
import Spinner from './components/ui/Spinner/Spinner'
import Logout from './containers/Auth/Logout/logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'


// Lazy Loading
const Auth = React.lazy(()=>import('./containers/Auth/Auth'))
const Orders = React.lazy(()=>import('./containers/Orders/Orders'))




class  App extends Component {

  constructor(props){
    super(props)

    this.props.authCheck()
  }

  render() {

    let routes = (

      <Switch>

      {/* <Route  path = "/auth"  component ={Auth}  /> */}

      <Route  path = "/auth"  render = {()=><Suspense fallback={<Spinner/>} > <Auth/> </Suspense>}  />


      <Route  path = "/" exact component ={Burgerbuilder}  />

      <Redirect to="/" />


      </Switch>

    )

    if(this.props.isAuthenticated){
      routes = (

        <Switch>
     
  
  
        {/* <Route  path = "/orders"  component = {Orders}  /> */}
        {/* <Route  path = "/auth"  component ={Auth}  /> */}
       
      <Route  path = "/orders"  render = {()=><Suspense fallback={<Spinner/>} > <Orders/> </Suspense>}  />
      
      <Route  path = "/auth"  render = {()=><Suspense fallback={<Spinner/>} > <Auth/> </Suspense>}  />

      <Route  path = "/logout"  component ={Logout}  />
    
    
        <Route  path = "/checkout"  component = {Checkout}  />
        <Route  path = "/" exact component ={Burgerbuilder}  />
        
    
        <Route  render ={()=><h1>Error 404 not found</h1>}   />
    
    
    
        </Switch>

      )
    }

    return (

      <div>

      <Layout>


        {routes}
  
  
     
  
        
  
  
        
      </Layout>
  
      
  
  
      </div>
      
     
    )
  }
 
}

const mapStateToProps = state=>{
  return{

    isAuthenticated: state.auth.token!==null
  }
}

const mapDisaptchToProps = dispatch=>{
  return{
    authCheck : ()=>dispatch(actions.authCheck())
  }
}

export default connect(mapStateToProps , mapDisaptchToProps)(App);
