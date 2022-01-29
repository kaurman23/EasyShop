import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Alert } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { listProducts } from '../../redux/actions/productActions'
import Loader from '../../shared/components/Loader'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, loading, error } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Row sm={12} md={4} lg={3} xl={3}>
          {products.map((product) => {
            return (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            )
          })}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
