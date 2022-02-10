import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { listProducts } from '../../redux/actions/productActions'
import Loader from '../../shared/components/Loader'
import Message from '../../shared/components/Message'
import { useParams } from 'react-router-dom'
import Paginate from '../../shared/components/Paginate'

const HomeScreen = () => {
  const { keyword } = useParams()
  let { pageNumber } = useParams()
  pageNumber = pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products, loading, error, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row sm={12} md={4} lg={3} xl={3}>
            {products.map((product) => {
              return (
                <Col className='align-items-stretch d-flex' key={product._id}>
                  <ProductCard product={product} />
                </Col>
              )
            })}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  )
}

export default HomeScreen
