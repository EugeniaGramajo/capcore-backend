import prisma from '@/config/prisma-client.config'
import { Request, Response } from 'express'

export default class ItemsController {
	async getAllItems(req: Request, res: Response) {
		try {
			const items = await prisma.item.findMany()
			res.status(200).json(items)
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to fetch items' })
		}
	}

	async getItemById(req: Request, res: Response) {
		try {
			const { id } = req.params
			const item = await prisma.item.findUnique({ where: { id: parseInt(id) } })

			if (!item) {
				return res.status(404).json({ message: 'Item not found' })
			}

			res.status(200).json(item)
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to fetch item' })
		}
	}

	async createItem(req: Request, res: Response) {
		try {
			const { name } = req.body
			const newItem = await prisma.item.create({
				data: { name },
			})
			res.status(201).json(newItem)
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to create item' })
		}
	}

	async updateItem(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { name } = req.body
			const updatedItem = await prisma.item.update({
				where: { id: parseInt(id) },
				data: { name },
			})

			res.status(200).json(updatedItem)
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to update item' })
		}
	}

	async deleteItem(req: Request, res: Response) {
		try {
			const { id } = req.params
			await prisma.item.delete({ where: { id: parseInt(id) } })

			res.status(200).json('Item deleted')
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to delete item' })
		}
	}
}
