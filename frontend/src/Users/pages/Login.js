import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../../shared/UI/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions/userActions'
import Loader from '../../shared/components/Loader'
import Message from '../../shared/components/Message'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const { search } = useLocation()

  const redirect = new URLSearchParams(search).get('querystringkey')
  console.log(redirect)

  useEffect(() => {
    if (userInfo) {
      if (redirect) navigate(redirect)
      else navigate('/')
    }
  }, [redirect, navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }

  return (
    <FormContainer>
      <h1>Log In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <Button className='my-3' type='submit' variant='primary'>
          Submit
        </Button>
      </Form>

      <Row className='my-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Login
