import { Router } from 'express'
import { ClientController } from '../controllers/client.controller'

const clientRouter = Router()
const clientController = new ClientController()

// Ruta para crear un cliente
clientRouter.post('/', clientController.createClient)

// Ruta para obtener todos los clients
clientRouter.get('/', clientController.getClients)

// Ruta para obtener datos de un cliente
clientRouter.get('/:id', clientController.getClientById)

// Ruta para modificar datos de un cliente
clientRouter.put('/:id', clientController.updateClient)

// Ruta para eliminar un cliente
clientRouter.delete('/:id', clientController.deleteClient)

export default clientRouter
