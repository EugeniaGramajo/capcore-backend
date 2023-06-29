import { Router } from 'express'
import TitleController from '@/controllers/title.controller'

const titleRouter = Router()
const titleController = new TitleController()

titleRouter.get('/', titleController.getAllTitle)

titleRouter.get('/:id', titleController.getTitleById)

titleRouter.post('/:subBudgetId', titleController.createNewTitle)

titleRouter.post('/toTitle/:titleId', titleController.createTitleForTitle)

titleRouter.get('/delete/:id', titleController.deleteTitle)

titleRouter.delete('/:id', titleController.commonDelete)

export default titleRouter