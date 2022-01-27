import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row sm={12} md={4} lg={3} xl={3}>
        {products.map((product) => {
          return (
            <Col key={product._id}>
              <ProductCard product={product} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default HomeScreen
