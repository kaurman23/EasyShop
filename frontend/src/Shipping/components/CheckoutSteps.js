import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav>
      <Nav.Item>
        {step1 ? (
          <Nav.Link as={NavLink} to='/login'>
            Log In
          </Nav.Link>
        ) : (
          <Nav.Link as={NavLink} disabled>Log In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Nav.Link as={NavLink} to='/shipping'>
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link as={NavLink} disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Nav.Link as={NavLink} to='/payments'>
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link as={NavLink} to='/payments' disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Nav.Link as={NavLink} to='/signIn'>
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link as={NavLink}  to='/signIn' disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
