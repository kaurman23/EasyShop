import React, { useEffect } from 'react'
import { ListGroup, Row, Col, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Message from '../../shared/components/Message'
import Loader from '../../shared/components/Loader'
import { getOrderDetails} from '../../redux/actions/orderActions'

const Orders = () => {
    let { id } = useParams()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getOrderDetails(id))
  } , [id, dispatch])

  const orderDetails = useSelector(state => state.orderDetails)
  const {order, loading, error} = orderDetails

 
  return loading? <Loader /> : error? <Message variant='danger'>{error}</Message> : <>
  <h1>ORDER {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>Shipping</h3>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
            <p>
              <strong>Address: </strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered? <Message variant='success'>Delivered!</Message> : <Message variant='danger'>Not Delivered</Message>}
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Payment Method</h3>
            <p>
              <strong>Method: </strong> {order.paymentMethod}
            </p>
            {order.isPaid? <Message variant='success'>Paid</Message> : <Message variant='danger'>Not Paid</Message>}
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Order Items</h3>
            {order.orderItems.length === 0 ? (
              <Message>Your Cart is empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item) => {
                  return (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='text-center'>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col className="text-left">${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col className="text-left">${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col className="text-left">${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col className="text-left">${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant='danger'>{error}</Message> }
            </ListGroup.Item>
          </ListGroup>  
        </Card>
      
      </Col>
    </Row>
  </>
  
}

export default Orders
