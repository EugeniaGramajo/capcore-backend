import prisma from '@/config/prisma-client.config'
import ProjectPermission from '@/utils/interfaces'
import { Request, Response } from 'express'
import { titleRecursive } from '@/utils/recursive.functions'

export default class ProjectsController {
	async getAllProjects(req: Request, res: Response) {
		try {
			const allProjects = await prisma.project.findMany({include: {
				client:true
			}})
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
				include: {
					client:true,
					budget_blocks: {
						include: {
							versions: {
								include: {
									subBudgets: {
										include: {
											titles: true,

										},
									},
								},
							},
						},
					},
				},
			})

			if (!projectById) {
				return res.status(404).json({ message: 'Project not found!' })
			}

			const updatedBudgetBlocks = await Promise.all(
				projectById.budget_blocks.map(async (block) => {
					const updatedVersions = await Promise.all(
						block.versions.map(async (version) => {
							const updatedSubBudgets = await Promise.all(
								version.subBudgets.map(async (subBudget) => {
									const updatedTitles = await Promise.all(
										subBudget.titles.map(async (title) => {
											const updatedTitle = await titleRecursive(title.id)
											return updatedTitle
										})
									)
									subBudget.titles = updatedTitles
									return subBudget
								})
							)
							version.subBudgets = updatedSubBudgets
							return version
						})
					)
					block.versions = updatedVersions
					return block
				})
			)

			projectById.budget_blocks = updatedBudgetBlocks

			res.status(200).json(projectById)
		} catch (error) {
			res.status(400).json({ error, message: 'An error has occurred' })
		}
	}

	async getProjectDataByVersion(req: Request, res: Response){
			try {
				const { projectId } = req.params
				const { versionId } = req.params
	
				const projectById = await prisma.project.findUnique({
					where: {
						id: projectId?.toString(),
					},
					include: {
						budget_blocks: {
							include: {
								versions: {
									where: { id: parseInt(versionId) },
									include: {
										subBudgets: {
											include: {
												titles: true,
											},
										},
									},
								},
							},
						},
					},
				})
	
				if (!projectById) {
					return res.status(404).json({ message: 'Project not found!' })
				}
	
				const updatedBudgetBlocks = await Promise.all(
					projectById.budget_blocks.map(async (block) => {
						const updatedVersions = await Promise.all(
							block.versions.map(async (version) => {
								const updatedSubBudgets = await Promise.all(
									version.subBudgets.map(async (subBudget) => {
										const updatedTitles = await Promise.all(
											subBudget.titles.map(async (title) => {
												const updatedTitle = await titleRecursive(title.id)
												return updatedTitle
											})
										)
										subBudget.titles = updatedTitles
										return subBudget
									})
								)
								version.subBudgets = updatedSubBudgets
								return version
							})
						)
						block.versions = updatedVersions
						return block
					})
				)
	
				projectById.budget_blocks = updatedBudgetBlocks
	
				res.status(200).json(projectById)
			} catch (error) {
				res.status(400).json({ error, message: 'An error has occurred' })
			}
		
	}

	async createProject(req: Request, res: Response) {
		try {
			const dataProject = req.body
			console.log(dataProject)
			const project = await prisma.project.create({
				data: {
					...dataProject,
					permissions: {
						edit: [dataProject.author_id],
						view: [dataProject.author_id],
						comment: [dataProject.author_id],
					},
				},
			})
			console.log(project)
			const budgetBlock = await prisma.budgetBlock.create({
				data: {
					code: '01',
					project: {
						connect: {
							id: project.id,
						},
					},
				},
			})
			console.log(budgetBlock)
			const budgetBlockVersion = await prisma.budgetBlockVersion.create({
				data: {
					name: dataProject.name,
					code: '01',
					project: {
						connect: {
							id: project.id,
						},
					},
					budget_block: {
						connect: {
							id: budgetBlock.id,
						},
					},
				},
			})
			console.log(budgetBlockVersion)
			res.status(200).json({
				message: 'Project creation succeeded!',
				project: { ...project, budgetBlock, budgetBlockVersion },
			})
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to create a new project' })
		}
	}

	async getUserProjects(req: Request, res: Response){
		try {
			const { id } = req.params
			const userProjects = await prisma.project.findMany({where:{author_id: id},include:{client:true}})
			res.status(200).json(userProjects)
		} catch (error) {
			res.status(400).json("something went wrong")
		}
	}

	async updateProject(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { editor } = req.params
			const updatedData = req.body

			const projectEditPermission = await prisma.project.findUnique({ where: { id } })
			const permission = projectEditPermission?.permissions as unknown as ProjectPermission
			if (permission.edit.includes(editor)) {
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
			} else {
				res.status(400).json({ message: 'You do not have permission to edit this project.' })
			}
		} catch (error) {
			res.status(400).json({
				error,
				message: 'Unable to update the project',
			})
		}
	}

	async deleteProject(req: Request, res: Response) {
		try {
			const { id } = req.params
			await prisma.project.delete({
				where: {
					id,
				},
			})
			res.status(200).json({ message: 'Project deleted successfully' })
		} catch (error) {
			res.status(500).json({ error, message: 'Unable to delete project' })
		}
	}
}
