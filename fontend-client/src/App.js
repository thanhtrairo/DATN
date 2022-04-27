import {BrowserRouter, Route, Switch} from 'react-router-dom'

import "slick-carousel/slick/slick.css" 
import "slick-carousel/slick/slick-theme.css"
import "react-toastify/dist/ReactToastify.css"

import Login from './Screens/LoginScreen'
import Register from './Screens/RegisterScreen'
import Product from './Screens/ProductScreen'
import Blog from './Screens/BlogScreen'
import SingleProduct from './Screens/SingleProduct'
import CartScreen from './Screens/CartScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import ProfileScreen from './Screens/ProfileScreen'
import Home from './Screens/HomeScreen'
import OrderScreen from './Screens/OrderScreen'
import NotFound from './Screens/NotFound'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/products" component={Product}/>
          <Route exact path="/blog" component={Blog}/>
          <Route exact path="/cart/:productId?" component={CartScreen}/>
          <Route exact path="/products/:productId" component={SingleProduct}/>
          <Route exact path="/profile" component={ProfileScreen}/>
          <Route exact path="/shipping" component={ShippingScreen}/>
          <Route exact path="/placeorder" component={PlaceOrderScreen}/>
          <Route exact path="/order/:orderId" component={OrderScreen}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App