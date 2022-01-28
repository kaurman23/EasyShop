import dotenv from 'dotenv'
import products from './data/products.js'
import users from './data/users.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'


dotenv.config()

connectDB()

const insertData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)
        
        console.log('Data inserted')
        process.exit()

    } catch(err){
        console.log('There was some error' + err)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        
        console.log('Data deleted')
        process.exit()

    } catch(err){
        console.log('There was some error' + err)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
} else {
    insertData()
}



