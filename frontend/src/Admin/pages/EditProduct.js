import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../../shared/UI/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProductDetails,
  updateProductDetails,
} from '../../redux/actions/productActions'
import Loader from '../../shared/components/Loader'
import Message from '../../shared/components/Message'
import {
  PRODUCT_DETAIL_UPDATE_RESET,
  CLEAR_PRODUCT_DETAILS,
} from '../../redux/constants/productConstants'
import axios from 'axios'

const EditProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  let { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productDetailUpdate = useSelector((state) => state.productDetailUpdate)
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = productDetailUpdate

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_DETAIL_UPDATE_RESET })
      dispatch({ type: CLEAR_PRODUCT_DETAILS })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id))
      } else {
        setName(product.name)
        setImage(product.image)
        setPrice(product.price)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, product, id, navigate, updateSuccess])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (err) {
      console.error(err)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProductDetails({
        _id: id,
        name,
        price,
        image,
        description,
        category,
        brand,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/productList'>
        <b>Go back</b>
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group className='my-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group className='my-3' controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' controlId='countInStock'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className='my-3' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditProduct
