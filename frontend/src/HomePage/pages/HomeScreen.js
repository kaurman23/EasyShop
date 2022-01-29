import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { listProducts } from '../../redux/actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, loading, error } = productList

  useEffect(() => {
    console.log("hey")
    dispatch(listProducts())
  }, [dispatch])

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
