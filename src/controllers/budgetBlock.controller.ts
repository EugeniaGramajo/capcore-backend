import prisma from '@/config/prisma-client.config'
import { Request, Response } from 'express'

export default class BudgetBlockController {
	async getAllBudgetBlocks(req: Request, res: Response) {
		try {
			const allBudgets = await prisma.budgetBlock.findMany()
			res.status(200).json(allBudgets)
		} catch (error) {
			res.status(400).json({ error, message: 'Budget Blocks not found!' })
		}
	}

    async createBudgetBlock(req: Request, res: Response) {
        try {
          const { projectId } = req.params;
          const { code } = req.body;
      
          const project = await prisma.project.findUnique({ where: { id: projectId } });
      
          if (!project) {
            return res.status(404).json({ message: 'Project not found' });
          }
      
          const createdBudgetBlock = await prisma.budgetBlock.create({
            data: {
              code,
              project: {
                connect: { id: projectId }
              }
            }
          });
      
          res.status(201).json({
            message: 'BudgetBlock created successfully!',
            budgetBlock: createdBudgetBlock,
          });
        } catch (error) {
          res.status(400).json({
            error,
            message: 'Unable to create the BudgetBlock',
          });
        }
      }
      
      

	async getBudgetBlockById(req: Request, res: Response) {
		try {
			const { id } = req.params 
			const budgetBlock = await prisma.budgetBlock.findUnique({ where: { id } }) 
			if (!budgetBlock) {
				return res.status(404).json({ message: 'Budget Block not found' })
			}
			res.status(200).json(budgetBlock)
		} catch (error) {
			res.status(400).json({ error, message: 'Error retrieving Budget Block' })
		}
	}

	async updateBudgetBlock(req: Request, res: Response) {
		try {
			const { id } = req.params 
			const data = req.body 
			const updatedBudgetBlock = await prisma.budgetBlock.update({ where: { id }, data }) 
			res.status(200).json(updatedBudgetBlock)
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to update Budget Block' })
		}
	}

	async deleteBudgetBlock(req: Request, res: Response) {
		try {
			const { id } = req.params 
			await prisma.budgetBlock.delete({ where: { id } }) 
			res.status(200).json({ message: 'Budget Block deleted successfully' })
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to delete Budget Block' })
		}
	}
}
