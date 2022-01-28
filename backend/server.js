import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res, next) => {
  res.send('API running...')
})

app.use('/api/products', productRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`)
})
