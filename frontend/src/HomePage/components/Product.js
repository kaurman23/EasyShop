import React from 'react'

import { Card } from 'react-bootstrap'
import Rating from '../../shared/UI/Rating'

const Product = ({ product }) => {
  return (
    <>
      <Card style={{ width: '18rem' }} className='my-3 p-3 rounded'>
        <a href={`product/${product._id}`}>
          <Card.Img variant='top' src={product.image} />
        </a>
        <Card.Body>
          <a href={`product/${product._id}`} style={{ textDecoration: 'none' }}>
            <Card.Title as='div'>
              <b>{product.name}</b>
            </Card.Title>
          </a>

          <Card.Text as='div' className='my-3'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} ratings`}
            />
          </Card.Text>
          <Card.Text as='h3'>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
