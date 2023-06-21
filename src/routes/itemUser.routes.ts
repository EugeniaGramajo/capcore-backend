import { Router } from 'express'
import ItemUserController from '@/controllers/itemUser.controller'

const itemsUserRouter = Router()
const itemUserController = new ItemUserController()

itemsUserRouter.get('/', itemUserController.getAllItemsUser)

itemsUserRouter.get('/:id', itemUserController.getItemUserById)

itemsUserRouter.post('/:id', itemUserController.createItemUser)

itemsUserRouter.put('/:id', itemUserController.updateItemUser)

itemsUserRouter.delete('/:id', itemUserController.deleteItemUser)

export default itemsUserRouter