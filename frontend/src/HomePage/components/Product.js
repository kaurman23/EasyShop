import React from 'react'

import { Card, Button } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <>
      <Card style={{ width: '18rem' }} className='my-3 p-3 rounded'>
        <a href={`product/${product._id}`}>
          <Card.Img variant='top' src={product.image} />
        </a>
        <Card.Body>
        <a href={`product/${product._id}`}>
        <Card.Title as='div'>
            <b>{product.name}</b>
          </Card.Title>
        </a>
          
          <Card.Text as='div' className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </Card.Text>
          <Card.Text as='h3'>
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
