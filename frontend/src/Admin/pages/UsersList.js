import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListOfUsers, clearListOfUser, deleteUser } from '../../redux/actions/userActions'
import Loader from '../../shared/components/Loader'
import Message from '../../shared/components/Message'
import { Table, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const UsersList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userList = useSelector((state) => state.userList)
  const { loading, users, error } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
      if(userInfo && userInfo.isAdmin){
        dispatch(getListOfUsers())
      } else {
          navigate('/login')
      }
    

    return () => {
        dispatch(clearListOfUser())
      }
  }, [dispatch, userInfo, navigate, successDelete])

  const deleteHandler = (userID) => {
      dispatch(deleteUser(userID))
  }
  return (
    <>
      <h1>User List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailTo:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                <Link to={`/user/${user._id}`}>
                      <Button className='btn-sm' variant='light'>
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                <Button className='btn-sm' variant='danger' disabled={userInfo._id === user._id} onClick={() => deleteHandler(user._id)}>
                <i className="fas fa-trash"></i>
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UsersList
