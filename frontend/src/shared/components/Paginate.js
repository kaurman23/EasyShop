import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Paginate.css'

const Paginate = ({ page, pages, keyword = '', isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination className='justify-content-center my-3'>
        {[...Array(pages).keys()].map((x) => (
          <Link
            className={`paginate ${x + 1 === page ? 'active-paginate' : ''}`}
            to={!isAdmin? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`: `/admin/productlist/${x+1}`}
          >
            {x + 1}
          </Link>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
