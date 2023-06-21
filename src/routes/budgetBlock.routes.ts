import { Router } from 'express'
import BudgetBlockController from '@/controllers/budgetBlock.controller'

const budgetBlockRouter = Router()
const budgetBlockController = new BudgetBlockController()

budgetBlockRouter.get('/', budgetBlockController.getAllBudgetBlocks)

budgetBlockRouter.get('/:id', budgetBlockController.getBudgetBlockById)

budgetBlockRouter.post('/:projectId', budgetBlockController.createBudgetBlock)

budgetBlockRouter.put('/:id', budgetBlockController.updateBudgetBlock)

budgetBlockRouter.delete('/:id', budgetBlockController.deleteBudgetBlock)

export default budgetBlockRouter;
