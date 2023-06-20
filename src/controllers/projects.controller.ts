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
			const { id } = req.params

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
			res.status(400).json({ error, message: 'An error has occurred' })
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
			const { id } = req.params
			const updatedData = req.body

			const updatedProject = await prisma.project.update({
				where: {
					id: id,
				},
				data: updatedData,
			})

			res.status(200).json({
				message: 'Project updated successfully!',
				project: updatedProject,
			})
		} catch (error) {
			res.status(400).json({
				error,
				message: 'Unable to update the project',
			})
		}
	}

	async deleteProject(req: Request, res: Response) {
            try {
			const { id } = req.params;
			await prisma.project.delete({
				where: {
					id, 
				},
			});
			res.status(200).json({ message: 'Project deleted successfully' });
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to delete project' });
		}
	}
}
