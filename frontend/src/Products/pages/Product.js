import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Rating from '../../shared/UI/Rating'
import Loader from '../../shared/components/Loader'
import Message from '../../shared/components/Message'
import {
  listProductDetails,
  clearProductDetails,
} from '../../redux/actions/productActions'
import { addItemToCart } from '../../redux/actions/cartActions'

import './Product.css'

const Product = () => {
  let { id } = useParams()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)

  const productDetails = useSelector((state) => state.productDetails)
  const { product, error, loading } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))

    return () => {
      dispatch(clearProductDetails())
    }
  }, [id, dispatch])

  const addToCartHandler = () => {
    console.log(qty)
    dispatch(addItemToCart(product._id, qty))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        <b>Go back</b>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col className='product-page-section' md={6}>
            <Image src={product.image} alt={product.name} fluid />{' '}
          </Col>
          <Col className='product-page-section' md={3}>
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
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col className='product-page-section' md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col className='product-page-section'>Price:</Col>
                    <Col className='product-page-section'>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className='product-page-section'>Status:</Col>
                    <Col className='product-page-section'>
                      {product.countInStock ? 'In Stock' : 'Out of stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col className='product-page-section'>Qty:</Col>
                      <Col className='product-page-section'>
                        <Form.Control
                          className='form-select'
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
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
        </Row>
      )}
    </>
  )
}

export default Product
