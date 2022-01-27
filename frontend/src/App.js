import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './shared/components/Footer'
import Header from './shared/components/Header'
import { Container } from 'react-bootstrap'
import HomeScreen from './HomePage/pages/HomeScreen'
import Product from './Products/pages/Product'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<Product />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
