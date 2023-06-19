import prisma from '@/config/prisma-client.config'
import { Request, Response } from 'express'

export default class ProjectsController {
	async getAllProjects(req: Request, res: Response) {
		try {
			const allProjects = await prisma.project.findMany()
			res.status(200).json(allProjects)
		} catch (error) {
			res.status(400).json(error)
		}
	}

	async getProjectById(req: Request, res: Response) {
		try {
			const { id } = req.query

			const projectById = await prisma.project.findUnique({
				where: {
					id: id?.toString(),
				},
			})
			if (!projectById) {
				res.status(400).json('Project not found!')
			} else {
				res.status(200).json(projectById)
			}
		} catch (error) {
			res.status(400).json({ error, msg: 'An error has occurred' })
		}
	}

	async createProject(req: Request, res: Response) {
		try {
			const dataProject = req.body
			const project = await prisma.project.create({ data: dataProject })
			res.status(200).json({ message: 'Project creation succedded!', project })
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to create a new project' })
		}
	}

	async updateProject(req: Request, res: Response) {
		try {
		} catch (error) {}
	}

	async deleteProject(req: Request, res: Response) {
		try {
		} catch (error) {}
	}
}
