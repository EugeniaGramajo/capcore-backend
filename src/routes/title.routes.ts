import { Router } from 'express'
import TitleController from '@/controllers/title.controller'

const titleRouter = Router()
const titleController = new TitleController()

titleRouter.get('/', titleController.getAllTitle)

titleRouter.get('/:id', titleController.getTitleById)

titleRouter.post('/:id', titleController.createNewTitle)

export default titleRouter