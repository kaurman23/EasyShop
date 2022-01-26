import React from 'react'

import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../../shared/UI/Rating'

const ProductCard = ({ product }) => {
  return (
    <>
      <Card style={{ width: '18rem' }} className='my-3 p-3 rounded'>
        
        <Link to={`product/${product._id}`}>
          <Card.Img variant='top' src={product.image} />
        </Link>

        <Card.Body>
          <Link
            to={`product/${product._id}`}
            style={{ textDecoration: 'none' }}
          >
            <Card.Title as='div'>
              <b>{product.name}</b>
            </Card.Title>
          </Link>

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

export default ProductCard
