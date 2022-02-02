import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, updateUserProfile } from '../../redux/actions/userActions'
import Loader from '../../shared/components/Loader'
import Message from '../../shared/components/Message'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userProfile = useSelector((state) => state.userProfile)
  const { loading, error} = userProfile

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userName = userInfo.name;
  const userEmail = userInfo.email;

  const userUpdateProfile = useSelector((state) => state.userProfieUpdate)
  const {success} = userUpdateProfile

  useEffect(() => {
      setName(userName)
      setEmail(userEmail)
      setMessage('')
      
      dispatch(getUserProfile('profile'))
      console.log("ok")
  }
 , [navigate,  dispatch, userName, userEmail])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      setMessage("Password should be same!")
    } else{
      dispatch(updateUserProfile({_id: userInfo._id, email: (email !== userInfo.email)? email: '',name, password} ))
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
          <Button className='my-3' type='button' variant='primary' onClick={submitHandler}>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
          <h2>Order Details</h2>
      </Col>
    </Row>
  )
}

export default Profile
