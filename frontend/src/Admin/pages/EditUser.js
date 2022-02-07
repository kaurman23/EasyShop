import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../../shared/UI/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserDetails } from '../../redux/actions/userActions'
import Loader from '../../shared/components/Loader'
import Message from '../../shared/components/Message'
import { USER_DETAIL_UPDATE_RESET } from '../../redux/constants/userConstants'

const EditUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  let { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, userInfo } = userDetail

  const userDetailUpdate = useSelector((state) => state.userDetailUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userDetailUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_DETAIL_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!userInfo.name || userInfo._id !== id) {
        dispatch(getUserDetails(id))
      } else {
        setName(userInfo.name)
        setEmail(userInfo.email)
        setIsAdmin(userInfo.isAdmin)
      }
    }
  }, [dispatch, userInfo, id, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserDetails({_id: userInfo._id, name, email, isAdmin}))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/userlist'>
        <b>Go back</b>
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
            <Form.Group className='my-3' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default EditUser
