import { Request, Response } from 'express'
import prisma from '../config/prisma-client.config'

export default class ProjectSupplyController {
	async getProjectSupplies(req: Request, res: Response) {
		try {
			const projectSupplies = await prisma.projectSupply.findMany()
			res.json(projectSupplies)
		} catch (error) {
			console.log(error)
			res.status(500).json({ error: 'Something went wrong' })
		}
	}

	async postProjectSupply(req: Request, res: Response) {
		try {
			const {
				name,
				price,
				image,
				url,
				measurement_unit,
				type,
				source_supply_id,
				version_id,
				unified_index_id
			} = req.body

			const projectSupplyData = {
				name,
				price,
				image,
				url,
				measurement_unit,
				type,
				source_supply_id,
				version_id,
				unified_index_id
			}

			const projectSupply = await prisma.projectSupply.create({
				data: projectSupplyData
			})

			res.json(projectSupply)
		} catch (error) {
			console.log(error)
			res.status(400).json({ error: 'Something went wrong' })
		}
	}

	async getProjectSupplyById(req: Request, res: Response) {
		try {
			const { id } = req.params

			const projectSupply = await prisma.projectSupply.findUnique({
				where: {
					id: id
				}
			})

			if (!projectSupply) {
				return res.status(404).json({ error: 'Project supply not found' })
			}

			res.json(projectSupply)
		} catch (error) {
			res.status(400).json({ error })
		}
	}

	async updateProjectSupply(req: Request, res: Response) {
		try {
			const { id } = req.params
			const {
				name,
				price,
				image,
				url,
				measurement_unit,
				type,
				source_supply_id,
				version_id
			} = req.body

			const existingProjectSupply = await prisma.projectSupply.findUnique({
				where: {
					id: id
				}
			})

			if (!existingProjectSupply) {
				return res.status(404).json({ error: 'Project supply not found' })
			}

			const projectSupplyData = {
				name: name || existingProjectSupply.name,
				price: price || existingProjectSupply.price,
				image: image || existingProjectSupply.image,
				url: url || existingProjectSupply.url,
				measurement_unit: measurement_unit || existingProjectSupply.measurement_unit,
				type: type || existingProjectSupply.type,
				source_supply_id: source_supply_id || existingProjectSupply.source_supply_id,
				version_id: version_id || existingProjectSupply.version_id
			}

			const updatedProjectSupply = await prisma.projectSupply.update({
				where: {
					id: id
				},
				data: projectSupplyData
			})

			res.json(updatedProjectSupply)
		} catch (error) {
			res.status(400).json({ error: error })
		}
	}

	async deleteProjectSupply(req: Request, res: Response) {
		try {
			const { id } = req.params

			const existingProjectSupply = await prisma.projectSupply.findUnique({
				where: {
					id: id
				}
			})

			if (!existingProjectSupply) {
				return res.status(404).json({ error: 'Project supply not found' })
			}

			await prisma.projectSupply.delete({
				where: {
					id: id
				}
			})

			res.json({ message: 'Project supply deleted' })
		} catch (error) {
			res.status(400).json({ error })
		}
	}
}
