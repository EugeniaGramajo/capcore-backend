import prisma from '@/config/prisma-client.config';
import { Request, Response } from 'express';

export default class BudgetBlockVersionController {
  async getAllBudgetBlockVersions(req: Request, res: Response) {
    try {
      const budgetBlockVersions = await prisma.budgetBlockVersion.findMany();
      res.status(200).json(budgetBlockVersions);
    } catch (error) {
      res.status(400).json({
        error,
        message: 'Unable to fetch the BudgetBlock versions',
      });
    }
  }

  async getBudgetBlockVersionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumber = parseInt(id);
  
      if (isNaN(idNumber)) {
        return res.status(400).json({ message: 'Invalid id. Must be a number.' });
      }
  
      const budgetBlockVersion = await prisma.budgetBlockVersion.findUnique({ where: { id: idNumber } });
  
      if (!budgetBlockVersion) {
        return res.status(404).json({ message: 'BudgetBlock version not found' });
      }
  
      res.status(200).json(budgetBlockVersion);
    } catch (error) {
      res.status(400).json({
        error,
        message: 'Unable to fetch the BudgetBlock version',
      });
    }
  }
  

  async createBudgetBlockVersion(req: Request, res: Response) {
    try {
      const { projectId, budgetBlockId } = req.params;
      const { code, name } = req.body;

      const project = await prisma.project.findUnique({ where: { id: projectId } });
      const budgetBlock = await prisma.budgetBlock.findUnique({ where: { id: budgetBlockId } });

      if (!project || !budgetBlock) {
        return res.status(404).json({ message: 'Project or BudgetBlock not found' });
      }

      const createdBudgetBlockVersion = await prisma.budgetBlockVersion.create({
        data: {
          code,
          name,
          project: { connect: { id: projectId } },
          budget_block: { connect: { id: budgetBlockId } },
        },
      });

      res.status(201).json({
        message: 'BudgetBlockVersion created successfully!',
        budgetBlockVersion: createdBudgetBlockVersion,
      });
    } catch (error) {
      res.status(400).json({
        error,
        message: 'Unable to create the BudgetBlockVersion',
      });
    }
  }

  async updateBudgetBlockVersion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const idNumber = parseInt(id);
  
      if (isNaN(idNumber)) {
        return res.status(400).json({ message: 'Invalid id. Must be a number.' });
      }
  
      const existingBudgetBlockVersion = await prisma.budgetBlockVersion.findUnique({ where: { id: idNumber } });
  
      if (!existingBudgetBlockVersion) {
        return res.status(404).json({ message: 'BudgetBlock version not found' });
      }
  
      const updatedBudgetBlockVersion = await prisma.budgetBlockVersion.update({
        where: {
          id: idNumber,
        },
        data: updatedData,
      });
  
      res.status(200).json({
        message: 'BudgetBlock version updated successfully!',
        budgetBlockVersion: updatedBudgetBlockVersion,
      });
    } catch (error) {
      res.status(400).json({
        error,
        message: 'Unable to update the BudgetBlock version',
      });
    }
  }
  

  async deleteBudgetBlockVersion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumber = parseInt(id);
  
      if (isNaN(idNumber)) {
        return res.status(400).json({ message: 'Invalid id. Must be a number.' });
      }
  
      const existingBudgetBlockVersion = await prisma.budgetBlockVersion.findUnique({ where: { id: idNumber } });
  
      if (!existingBudgetBlockVersion) {
        return res.status(404).json({ message: 'BudgetBlock version not found' });
      }
  
      await prisma.budgetBlockVersion.delete({ where: { id: idNumber } });
  
      res.status(200).json({ message: 'BudgetBlock version deleted successfully!' });
    } catch (error) {
      res.status(400).json({
        error,
        message: 'Unable to delete the BudgetBlock version',
      });
    }
  }
  
}
