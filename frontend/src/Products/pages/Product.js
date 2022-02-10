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
import { createProductReview } from '../../redux/actions/productActions'
import { PRODUCT_REVIEW_CREATE_RESET } from '../../redux/constants/productConstants'

import './Product.css'

const Product = () => {
  let { id } = useParams()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const productDetails = useSelector((state) => state.productDetails)
  const { product, error, loading } = productDetails

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    error: productReviewError,
    loading: productReviewLoading,
    success: productReviewSuccess,
  } = productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productReviewSuccess) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET })
    }
    
    dispatch(listProductDetails(id))

    return () => {
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET })
      dispatch(clearProductDetails())
    }
  }, [id, dispatch, productReviewSuccess])

  const addToCartHandler = () => {
    dispatch(addItemToCart(product._id, qty))
  }

  const reviewSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, { rating, comment }))
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
        <>
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
                      <Col className='product-page-section'>
                        ${product.price}
                      </Col>
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
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
          <Row className='my-3'>
            <Col md={6}>
              <h3>Reviews</h3>
              {product.reviews.length === 0 && (
                <Message variant='success'>No Reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Write a Customer Review</h4>
                  {productReviewError && (
                    <Message variant='danger'>{productReviewError}</Message>
                  )}
                  {productReviewLoading && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair.</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          row='3'
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                        <Button type='submit' variant='primary'>
                          Submit
                        </Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message variant='success'>
                      Please <Link to='/login'>log in</Link> to write a review{' '}
                      {''}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default Product
