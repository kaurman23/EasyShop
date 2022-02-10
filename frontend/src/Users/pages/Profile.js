import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserProfile,
  updateUserProfile,
} from '../../redux/actions/userActions'
import Loader from '../../shared/components/Loader'
import Message from '../../shared/components/Message'
import { listUserOrders } from '../../redux/actions/orderActions'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userProfile = useSelector((state) => state.userProfile)
  const { loading, error } = userProfile

  const userUpdateProfile = useSelector((state) => state.userProfieUpdate)
  const { success } = userUpdateProfile

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userOrderList = useSelector((state) => state.userOrderList)
  const { orders, loading: loadingOrders, error: errorOrders } = userOrderList

  const userName = userInfo.name
  const userEmail = userInfo.email

  useEffect(() => {
    setName(userName)
    setEmail(userEmail)
    setMessage('')

    dispatch(listUserOrders())
    dispatch(getUserProfile('profile'))
  }, [navigate, dispatch, userName, userEmail])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password should be same!')
    } else {
      dispatch(
        updateUserProfile({
          _id: userInfo._id,
          email: email !== userInfo.email ? email : '',
          name,
          password,
        })
      )
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h1>Register</h1>
        {success && <Message variant='success'>Profile Updated</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='my-3' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='my-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='my-3' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            className='my-3'
            type='button'
            variant='primary'
            onClick={submitHandler}
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Order Details</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/orders/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default Profile
