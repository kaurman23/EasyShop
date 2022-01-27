const express = require('express')
const products = require('./data/products')

const app = express()

app.get('/', (req, res, next) => {
  res.send('API running...')
})

app.get('/api/products', (req, res, next) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res, next) => {
  const pid = req.params.id
  const product = products.find((product) => product._id === pid)
  res.json(product)
})

app.listen(5000, () => {
  console.log('Server is running at port 5000')
})
