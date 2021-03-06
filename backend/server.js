import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoute from './routes/uploadRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import morgan from 'morgan'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/products', productRoute)

app.use('/api/users', userRoute)

app.use('/api/orders', orderRoutes)

app.use('/api/upload', uploadRoute)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*')
} else {
  app.get('/', (req, res, next) => {
    res.send('API running...', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
  })
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`)
})
