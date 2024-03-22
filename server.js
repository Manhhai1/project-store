require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

let URL = process.env.MONGODB_URL
mongoose.connect('mongodb+srv://haikt12345:123@cluster0.5hebbij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('connect success to MongoDB'));

mongoose.set('strictQuery', false)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server is running on port:', PORT)
})
app.get('/', (req, res) => {
    res.json({
        errCode: 0,
        message: 'get /s success'
    })
})
app.use('/user', userRouter)
app.use('/api', categoryRouter)
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))