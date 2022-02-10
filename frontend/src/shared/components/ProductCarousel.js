import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTopProducts } from '../../redux/actions/productActions'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'
import './ProductCarousel.css'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const topProducts = useSelector((state) => state.topProducts)
  const { loading, err, products } = topProducts

  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : err ? (
    <Message variant='red'>{err}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
