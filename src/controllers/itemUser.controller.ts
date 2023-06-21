import prisma from '@/config/prisma-client.config'
import { Request, Response } from 'express'

export default class ItemUserController {
	async getAllItemsUser(req: Request, res: Response) {
		try {
			const items = await prisma.userItem.findMany()
			res.status(200).json(items)
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to fetch items' })
		}
	}

	async getItemUserById(req: Request, res: Response) {
		try {
			const { id } = req.params
			const item = await prisma.userItem.findUnique({ where: { id: parseInt(id) } })

			if (!item) {
				return res.status(404).json({ message: 'Item not found' })
			}

			res.status(200).json(item)
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to fetch item' })
		}
	}

	async createItemUser(req: Request, res: Response) {
		try {
			const { name } = req.body
			const { id } = req.params
			const newItem = await prisma.userItem.create({
				data: {
					name,
					user: {
						connect: {
							id,
						},
					},
				},
			})
			res.status(201).json(newItem)
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to create item' })
		}
	}

	async updateItemUser(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { name } = req.body
			const updatedItem = await prisma.userItem.update({
				where: { id: parseInt(id) },
				data: { name },
			})

			res.status(200).json(updatedItem)
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to update item' })
		}
	}

	async deleteItemUser(req: Request, res: Response) {
		try {
			const { id } = req.params
			await prisma.userItem.delete({ where: { id: parseInt(id) } })

			res.status(200).json('Item deleted')
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to delete item' })
		}
	}
}
