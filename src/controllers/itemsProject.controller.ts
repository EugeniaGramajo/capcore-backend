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

	async createItemProject(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { name } = req.body
			const itemProjectCreated = await prisma.projectItem.create({
				data: {
					name,
					project: {
						connect: {
							id,
						},
					},
				},
			})
			res.status(200).json(itemProjectCreated)
		} catch (error) {
			res.status(400).json({ error, message: 'ItemProject created' })
		}
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
