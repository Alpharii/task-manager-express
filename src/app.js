import express from "express"
import tasks from './routes/tasks.js'
import connectDB from "./db/connect.js"
import dotenv from "dotenv" 
import cors from "cors"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000


//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.use('/api/v1/tasks', tasks)

// app.get ('api/v1/tasks')        --get all tasks
// app.post ('api/v1/tasks')       --create a task
// app.get ('api/v1/tasks/:id')    --get single tak
// app.patch ('api/v1/tasks/:id')  --update task
// app.delete ('api/v1/tasks/:id') --delete task

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