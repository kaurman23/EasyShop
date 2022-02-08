import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './shared/components/Footer'
import Header from './shared/components/Header'
import { Container } from 'react-bootstrap'
import HomeScreen from './HomePage/pages/HomeScreen'
import Product from './Products/pages/Product'
import Cart from './Cart/pages/Cart'
import Login from './Users/pages/Login'
import Register from './Users/pages/Register'
import Profile from './Users/pages/Profile'
import Shipping from './Shipping/pages/Shipping'
import PaymentMethod from './Shipping/pages/PaymentMethod'
import PlaceOrder from './Shipping/pages/PlaceOrder'
import Orders from './Shipping/pages/Orders'
import UsersList from './Admin/pages/UsersList'
import EditUser from './Admin/pages/EditUser'
import ProductList from './Admin/pages/ProductList'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={<Cart />}>
              <Route path=':id' element={<Cart />} />
              <Route path='' element={<Cart />} />
            </Route>
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/payments' element={<PaymentMethod />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/orders/:id' element={<Orders />} />
            <Route path='/admin/userlist' element={<UsersList />} />
            <Route path='/admin/user/:id/edit' element={<EditUser />} />
            <Route path='/admin/productlist' element={<ProductList />} />

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
