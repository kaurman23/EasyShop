import React from 'react';

import products from '../../products';

import {Row, Col} from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  return <>
      <h1>Latest Products</h1>
      <Row sm={12} md={4} lg={3} xl={3}  >
        {products.map(product => { return <Col key={product._id} >
            <ProductCard product={product}/>
        </Col>})}
      </Row>
  </>;
};

export default HomeScreen;
