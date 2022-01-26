import React from 'react';

import products from '../../products';

import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';

const HomeScreen = () => {
  return <>
      <h1>Latest Products</h1>
      <Row sm={12} md={4} lg={3} xl={3}  >
        {products.map(product => { return <Col key={product._id} >
            <Product product={product}/>
        </Col>})}
      </Row>
  </>;
};

export default HomeScreen;
