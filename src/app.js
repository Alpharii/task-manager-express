import express from "express"
import tasks from './routes/tasks.js'
import connectDB from "./db/connect.js"
import dotenv from "dotenv" 
import cors from "cors"
import notFound from "./middleware/not-found.js"
import errorHandler from "./middleware/error-handler.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000


//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is running in http://localhost:${port}`)
        })
    } catch(error){
        console.log(error)
    }
}

start()