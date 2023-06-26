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

	async createItemProjectForItemProject(req: Request, res: Response) {
		try {
			const { itemProjectId } = req.params
			const { name, measuring } = req.body

			const existingItemProject = await prisma.projectItem.findUnique({
				where: {
					id: parseInt(itemProjectId),
				},
			})

			const itemProjectCreated = await prisma.projectItem.create({
				data: {
					name: name,
					measuring,
				},
			})

			if (itemProjectCreated && existingItemProject) {
				existingItemProject.item_ids.push(itemProjectCreated.id)
				await prisma.projectItem.update({
					where: {
						id: existingItemProject.id,
					},
					data: {
						item_ids: existingItemProject.item_ids,
					},
				})
			}

			res.status(200).json(itemProjectCreated)
		} catch (error) {
			res.status(400).json({ error, message: 'ItemProject was not created' })
		}
	}

	async createNewItemProjectForATitle(req: Request, res: Response) {
		try {
			const { idTitle } = req.params
			const { name, measuring } = req.body

			const titleFound = await prisma.title.findUnique({ where: { id: idTitle } })

			if (titleFound) {
				const newItemProject = await prisma.projectItem.create({
					data: {
						name,
						measuring,
					},
				})

				if (newItemProject) {
					await prisma.title.update({
						where: { id: idTitle },
						data: {
							project_items: {
								push: newItemProject.id,
							},
						},
					})
					res.status(200).json({ message: 'Item project created!', newItemProject })
				} else {
					res.status(400).json('Something went wrong')
				}
			}
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to create a new ItemProject for a title' })
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
