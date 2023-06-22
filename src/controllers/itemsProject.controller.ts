import prisma from '@/config/prisma-client.config'
import { Request, Response } from 'express'

export default class ItemsProjectController {
	async getAllItemProject(req: Request, res: Response) {
		try {
			const allItemProjects = await prisma.projectItem.findMany()
			res.status(200).json(allItemProjects)
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to fetch itemsProjects' })
		}
	}

	async getItemProjectById(req: Request, res: Response) {
		try {
			const { id } = req.params
			const itemProject = await prisma.projectItem.findUnique({ where: { id: parseInt(id) } })
			res.status(200).json(itemProject)
		} catch (error) {
			res.status(400).json({ error, message: 'Item not found' })
		}
	}

	async createItemProjectForASubBudget(req: Request, res: Response) {
		try {
			const { idTitle } = req.params
			const { idBudgetBlockVersion } = req.params
			const { name, measuring } = req.body

			const existingItemProject = await prisma.projectItem.findFirst({
				where: {
					name,
					},
			})

			if (existingItemProject) {
				res.status(400).json({ message: 'ItemProject already exists in the project' })
				return
			}

			const title = await prisma.title.findFirst({
				where: { id:idTitle },
			})

			if (!title) {
				res.status(400).json({ message: 'Title does not exist in the project' })
				return
			}

			const itemProjectCreated = await prisma.projectItem.create({
				data: {
					name: name,
					budgetBlockVersion: {
						connect: {
							id: parseInt(idBudgetBlockVersion),
						},
					},
					measuring
				},
			})

			res.status(200).json(itemProjectCreated)
		} catch (error) {
			res.status(400).json({ error, message: 'ItemProject was not created' })
		}
	}

	async createNewTitleForATitle(req: Request, res: Response) {

	}

	async updateItemProject(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { name } = req.body
			const updatedItem = await prisma.projectItem.update({
				where: { id: parseInt(id) },
				data: { name },
			})

			res.status(200).json(updatedItem)
		} catch (error) {
			res.status(200).json({ error, message: 'Unable to update itemProject' })
		}
	}

	async deleteItemProject(req: Request, res: Response) {
		try {
			const { id } = req.params
			await prisma.projectItem.delete({ where: { id: parseInt(id) } })

			res.status(200).json('Item deleted')
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to delete item' })
		}
	}
}
