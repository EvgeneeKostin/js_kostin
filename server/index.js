require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUploader = require('express-fileupload')
const path = require('path')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000
//localhost:5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUploader({}))
app.use('/api', router)
//Обработчик ошибок
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING!!!'})
})

const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()