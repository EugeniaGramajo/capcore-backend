import { Router } from 'express'
import ItemsController from '@/controllers/item.controller'

const itemsRouter = Router()
const itemsController = new ItemsController()

itemsRouter.get('/', itemsController.getAllItems)

itemsRouter.get('/:id', itemsController.getItemById)

itemsRouter.post('/', itemsController.createItem)

itemsRouter.put('/:id', itemsController.updateItem)

itemsRouter.delete('/:id', itemsController.deleteItem)

export default itemsRouter