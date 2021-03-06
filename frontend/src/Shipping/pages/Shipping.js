import React, { useState } from 'react'
import FormContainer from '../../shared/UI/FormContainer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../redux/actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../../shared/components/Message'

const Shipping = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [country, setCountry] = useState(shippingAddress.country || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [validationError, setValidationError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (address && city && country && postalCode) {
      setValidationError(false)
      dispatch(saveShippingAddress({ address, city, country, postalCode }))
      navigate('/payments')
    } else {
      setValidationError(true)
    }
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      {validationError && <Message variant="danger">None of the fields can be empty!</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-3' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-3' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          className='my-3'
          type='submit'
          variant='primary'
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Shipping
