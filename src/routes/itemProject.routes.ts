import { Router } from 'express'
import ItemsProjectController from '@/controllers/itemsProject.controller'

const itemsProjectRouter = Router()
const itemsProjectController = new ItemsProjectController()

itemsProjectRouter.get('/', itemsProjectController.getAllItemProject)

itemsProjectRouter.get('/:id', itemsProjectController.getItemProjectById)

itemsProjectRouter.post('/:idTitle/:idBudgetBlockVersion', itemsProjectController.createItemProjectForASubBudget)

itemsProjectRouter.post('/', itemsProjectController.createNewTitleForATitle) 

itemsProjectRouter.put('/:id', itemsProjectController.updateItemProject)

itemsProjectRouter.delete('/:id', itemsProjectController.deleteItemProject)

export default itemsProjectRouter