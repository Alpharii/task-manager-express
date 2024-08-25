import Task from "../models/Tasks.js"
import asyncWrapper from "../middleware/async.js"
import { createCustomError } from "../errors/custom-error.js"

const getAllTasks = asyncWrapper (async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({ tasks }) 
})

const createTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(200).json({ task })
})

const getTasks = asyncWrapper (async (req, res, next) => {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
})

const deleteTasks = asyncWrapper (async (req, res) => {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
})

const updateTasks = asyncWrapper (async (req, res) => {
        const data = req.body
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID}, data, {
            new: true,
            runValidators: true
        })
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
})


export {
    getAllTasks,
    createTask,
    getTasks,
    updateTasks,
    deleteTasks
}