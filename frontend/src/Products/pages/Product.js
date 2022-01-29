import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Rating from '../../shared/UI/Rating'
import Loader from '../../shared/components/Loader'
import Message from '../../shared/components/Message'
import { listProductDetails, clearProductDetails } from '../../redux/actions/productActions'

const Product = () => {
  let { id } = useParams()
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {product, error, loading} = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))

    return () => {
      dispatch(clearProductDetails())
    }
    
  }, [id, dispatch])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        <b>Go back</b>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) :
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />{' '}
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3 className='my-3'>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} ratings`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock ? 'In Stock' : 'Out of stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='w-100'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  ADD TO CART
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>}
    </>
  )
}

export default Product
