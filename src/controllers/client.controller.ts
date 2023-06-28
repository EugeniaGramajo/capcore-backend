import { Request, Response } from 'express'
import prisma from '../config/prisma-client.config'

export class ClientController {
	async createClient(req: Request, res: Response) {
		try {
			const {
				name,
				district,
				address,
				province,
				department,
				business_name,
				RUC,
				image,
				contact,
				user_id
			} = req.body
			if (
				!name ||
				!district ||
				!address ||
				!province ||
				!department ||
				!business_name ||
				!RUC ||
				!contact ||
				!user_id
			) {
				return res.status(400).json({ error: 'Missing fields' })
			}
			const client = await prisma.client.create({
				data: {
					name,
					address,
					district,
					province,
					department,
					business_name,
					RUC,
					image,
					contact,
					user: { connect: { id: user_id } }
				}
			})
			res.status(201).json(client)
		} catch (error) {
			console.log(error)
			res.status(400).json({ error })
		}
	}

	async getClients(req: Request, res: Response) {
		try {
			const clients = await prisma.client.findMany({
				include: {
					user: true,
					projects: true
				}
			})

			res.json(clients)
		} catch (error) {
			res.status(400).json({ error })
		}
	}

	async getClientById(req: Request, res: Response) {
		const { id } = req.params

		try {
			const client = await prisma.client.findUnique({
				where: { id },
				include: {
					user: true,
					projects: true
				}
			})
			if (!client) {
				return res.status(404).json({ error: 'Client not found' })
			}

			res.json(client)
		} catch (error) {
			res.status(400).json({ error })
		}
	}

	async updateClient(req: Request, res: Response) {
		const { id } = req.params
		const { name, district, province, department, business_name, RUC, contact, user_id } = req.body

		try {
			const updatedClient = await prisma.client.update({
				where: { id },
				data: {
					name,
					district,
					province,
					department,
					business_name,
					RUC,
					contact,
					user: { connect: { id: user_id } }
				},
				include: {
					user: true,
					projects: true
				}
			})

			res.json(updatedClient)
		} catch (error) {
			res.status(400).json({ error })
		}
	}

	async deleteClient(req: Request, res: Response) {
		const { id } = req.params

		try {
			const deletedClient = await prisma.client.delete({
				where: { id },
				include: {
					user: true,
					projects: true
				}
			})

			res.json(deletedClient)
		} catch (error) {
			res.status(400).json({ error })
		}
	}
}
