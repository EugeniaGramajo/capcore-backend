// routes.js
import { Router } from 'express'
import ProjectSupplyController from '../controllers/projectSupplies.controller'

const projectSuppliesRouter = Router()
const projectSupplyController = new ProjectSupplyController()

// Rutas para ProjectSupply
projectSuppliesRouter.get('/projectSupplies', projectSupplyController.getProjectSupplies)
projectSuppliesRouter.post('/projectSupplies', projectSupplyController.postProjectSupply)
projectSuppliesRouter.get('/projectSupplies/:id', projectSupplyController.getProjectSupplyById)
projectSuppliesRouter.put('/projectSupplies/:id', projectSupplyController.updateProjectSupply)
projectSuppliesRouter.delete('/projectSupplies/:id', projectSupplyController.deleteProjectSupply)

export default projectSuppliesRouter
