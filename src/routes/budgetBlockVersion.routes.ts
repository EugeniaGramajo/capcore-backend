import { Router } from "express";
import BudgetBlockVersionController from "@/controllers/budgetBlockVersion.controller";

const budgetBlockVersionRouter = Router()
const budgetBlockVersionsController = new BudgetBlockVersionController()

budgetBlockVersionRouter.get('/', budgetBlockVersionsController.getAllBudgetBlockVersions)

budgetBlockVersionRouter.get('/:id', budgetBlockVersionsController.getBudgetBlockVersionById)

budgetBlockVersionRouter.post('/:projectId/:budgetBlockId', budgetBlockVersionsController.createBudgetBlockVersion)

budgetBlockVersionRouter.put('/:id', budgetBlockVersionsController.updateBudgetBlockVersion)

budgetBlockVersionRouter.delete('/:id', budgetBlockVersionsController.deleteBudgetBlockVersion)

export default budgetBlockVersionRouter