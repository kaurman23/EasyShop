import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`)
})
