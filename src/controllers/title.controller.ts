import prisma from '@/config/prisma-client.config'
import { Request, Response } from 'express'

export default class TitleController {
  async getAllTitle(req: Request, res: Response) {
    try {
      const titles = await prisma.title.findMany();
      res.status(200).json(titles);
    } catch (error) {
      res.status(400).json({ error, message: 'Unable to fetch titles' });
    }
  }

  async getTitleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const title = await prisma.title.findUnique({ where: { id } });
      res.status(200).json(title);
    } catch (error) {
      res.status(400).json({ error, message: 'Unable to fetch title' });
    }
  }

  async createNewTitle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const newTitle = await prisma.title.create({ data: { 
        name,
        sub_budget: {
            connect: {
                id:parseInt(id)
            }
        }
    } });
      res.status(201).json(newTitle);
    } catch (error) {
      res.status(400).json({ error, message: 'Unable to create a new title' });
    }
  }

  async updateTitle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedTitle = await prisma.title.update({
        where: { id },
        data: updatedData,
      });
      res.status(200).json(updatedTitle);
    } catch (error) {
      res.status(400).json({ error, message: 'Unable to update the title' });
    }
  }

  async deleteTitle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.title.delete({ where: { id } });
      res.status(200).json({ message: 'Title deleted successfully' });
    } catch (error) {
      res.status(400).json({ error, message: 'Unable to delete the title' });
    }
  }
}
