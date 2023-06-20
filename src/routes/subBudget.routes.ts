import SubBudgetController from "@/controllers/subBudget.controller";
import { Router } from "express";

const subBudgetRouter = Router()
const subBudgetController = new SubBudgetController()

subBudgetRouter.get('/', subBudgetController.getAllSubBudgets)

subBudgetRouter.get('/:id', subBudgetController.getSubBudgetById)

subBudgetRouter.post('/:id', subBudgetController.createSubBudget)

subBudgetRouter.put('/:id', subBudgetController.updateSubBudget)

subBudgetRouter.delete('/:id', subBudgetController.deleteSubBudget)

export default subBudgetRouter