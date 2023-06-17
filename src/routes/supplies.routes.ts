import SupplyController from '@/controllers/supplies.controller';
import {Router} from 'express'
const supplyRouter = Router()
const supplyController = new SupplyController()

// Ruta para combinar y guardar los datos en la base de datos con Prisma
supplyRouter.get('/combined-data', supplyController.getParseHub.bind(supplyController));

export default supplyRouter
