import { Router } from 'express'
import UserSupplyController from '@/controllers/userSupplies.controller';

const userSupplyRouter = Router()
const userSupplyController = new UserSupplyController()

// Ruta para obtener todos los insumos del usuario
userSupplyRouter.get('/', userSupplyController.getUserSupply)

//Ruta para crear los insumos del usuario
userSupplyRouter.post('/', userSupplyController.postUserSupply)

//Ruta para obtener el insumo del usuario por ID
userSupplyRouter.get('/:id', userSupplyController.getUserSupplyById)

//Ruta para editar el insumo del usuario
userSupplyRouter.put('/:id', userSupplyController.updateUserSupply)

//Ruta para eliminar el insumo del usuario
userSupplyRouter.delete('/:id', userSupplyController.deleteUserSupply)

export default userSupplyRouter