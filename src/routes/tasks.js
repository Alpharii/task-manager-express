import express from 'express'
const router = express.Router()

import {createTask, deleteTasks, getAllTasks, getTasks, updateTasks} from '../controllers/tasks.js'

router.route('/').get((getAllTasks)).post(createTask)
router.route('/:id').get(getTasks).patch(updateTasks).delete(deleteTasks)

export default router