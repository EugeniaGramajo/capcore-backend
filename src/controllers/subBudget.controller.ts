import prisma from '@/config/prisma-client.config'
import { Request, Response } from 'express'

export default class SubBudgetController {
	async getAllSubBudgets(req: Request, res: Response) {
		try {
			const subBudgets = await prisma.subBudget.findMany()

			res.status(200).json(subBudgets)
		} catch (error) {
			res.status(400).json({ error, message: 'An error has occurred' })
		}
	}

	async getSubBudgetById(req: Request, res: Response) {
		try {
			const { id } = req.params
			const idNumber = parseInt(id)

			const subBudget = await prisma.subBudget.findUnique({
				where: { id: idNumber },
			})

			if (!subBudget) {
				res.status(404).json({ message: 'SubBudget not found' })
			} else {
				res.status(200).json(subBudget)
			}
		} catch (error) {
			res.status(400).json({ error, message: 'An error has occurred' })
		}
	}

	async createSubBudget(req: Request, res: Response) {
		try {
			const { id } = req.params
			const idNumber = parseInt(id)
			const { name } = req.body
			console.log(id, name)
			const subBudget = await prisma.subBudget.create({
				data: {
					name,
					budget_block_version: {
						connect: { id: idNumber },
					},
				},
			})

			res.status(201).json(subBudget)
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to create a new SubBudget' })
		}
	}

	async updateSubBudget(req: Request, res: Response) {
		try {
			const { id } = req.params
			const idNumber = parseInt(id)
			const updatedData = req.body

			const updatedSubBudget = await prisma.subBudget.update({
				where: { id: idNumber },
				data: updatedData,
			})

			res.status(200).json(updatedSubBudget)
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to update the SubBudget' })
		}
	}

	async deleteSubBudget(req: Request, res: Response) {
		try {
			const { id } = req.params
			const idNumber = parseInt(id)

			await prisma.subBudget.delete({
				where: { id: idNumber },
			})

			res.status(200).json({ message: 'SubBudget deleted successfully!' })
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to delete the SubBudget' })
		}
	}
}
