import prisma from '@/config/prisma-client.config'
import { Request, Response } from 'express'

export default class TitleController {
	async getAllTitle(req: Request, res: Response) {
		try {
			const titles = await prisma.title.findMany()
			res.status(200).json(titles)
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to fetch titles' })
		}
	}

	async getTitleById(req: Request, res: Response) {
		try {
			const { id } = req.params
			const title = await prisma.title.findUnique({ where: { id } })
			res.status(200).json(title)
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to fetch title' })
		}
	}

	async createNewTitle(req: Request, res: Response) {
		try {
			const { subBudgetId } = req.params
			const { name } = req.body
			const newTitle = await prisma.title.create({
				data: {
					name,
					sub_budget: {
						connect: {
							id: parseInt(subBudgetId),
						},
					},
				},
			})
			res.status(201).json(newTitle)
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to create a new title' })
		}
	}

	async createTitleForTitle(req: Request, res: Response) {
		try {
			const { titleId } = req.params
			const { name } = req.body

			const parentTitle = await prisma.title.findUnique({ where: { id: titleId } })

			if (!parentTitle) {
				return res.status(404).json({ message: 'Parent title not found' })
			}

			const newTitle = await prisma.title.create({
				data: {
					name,
					parent_title: {
						connect: {
							id: titleId,
						},
					},
				},
			})

			await prisma.title.update({
				where: { id: titleId },
				data: {
					title_ids: {
						push: newTitle.id,
					},
				},
			})

			res.status(201).json(newTitle)
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to create a new title' })
		}
	}

	async updateTitle(req: Request, res: Response) {
		try {
			const { id } = req.params
			const updatedData = req.body
			const updatedTitle = await prisma.title.update({
				where: { id },
				data: updatedData,
			})
			res.status(200).json(updatedTitle)
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to update the title' })
		}
	}

	async commonDelete(req:Request, res:Response) {
		try {
			const {id} = req.params
			await prisma.title.delete({where:{id}})
			res.status(200).json("Title deleted")
		} catch (error) {
			res.status(400).json("An error has occurred")
		}
	}

	async deleteTitle(req: Request, res: Response) {
		try {
			const { id } = req.params

			const parentFound = await prisma.title.findUnique({
				where: { id },
				include: {
					parent_title: true,
				},
			})

			if (parentFound?.sub_budget_id) {
				const subBudgetParent = await prisma.subBudget.findUnique({
					where: { id: parentFound.sub_budget_id },
					include: { titles: true },
				})

				const auxTitle = parentFound.title_ids
				const auxItemProject = parentFound.project_items

				const position = subBudgetParent?.titles.findIndex((obj) => obj.id === id)

				if (position && position > 0) {
					const auxId = subBudgetParent?.titles[position - 1]?.id

					if (auxId) {
						const original = await prisma.title.findUnique({ where: { id: auxId } })

						if (original) {
							const copiedTitleIds = [...original.title_ids] // Copia del array de title_ids
							const copiedProjectItems = [...original.project_items] // Copia del array de project_items
							copiedTitleIds.push(...auxTitle)
							copiedProjectItems.push(...auxItemProject)

							await prisma.title.update({
								where: { id: auxId },
								data: {
									title_ids: copiedTitleIds,
									project_items: copiedProjectItems,
								},
							})
							await prisma.title.delete({ where: { id } })
							res.status(200).json({ message: 'Title deleted successfully' })
						} else {
							return res.status(400).json("Can't delete this title")
						}
					} else {
						return res.status(400).json("Can't delete this title")
					}
				} else if (position === 0) {
					const auxId = subBudgetParent?.titles[1]?.id
					if (auxId) {
						const original = await prisma.title.findUnique({ where: { id: auxId } })

						if (original) {
							const copiedTitleIds = [...original.title_ids] // Copia del array de title_ids
							const copiedProjectItems = [...original.project_items] // Copia del array de project_items
							copiedTitleIds.push(...auxTitle)
							copiedProjectItems.push(...auxItemProject)

							await prisma.title.update({
								where: { id: auxId },
								data: {
									title_ids: copiedTitleIds,
									project_items: copiedProjectItems,
								},
							})
							await prisma.title.delete({ where: { id } })

							res.status(200).json({ message: 'Title deleted successfully' })
						} else {
							return res.status(400).json("Can't delete this title")
						}
					} else if (subBudgetParent?.titles.length === 1) {
						const original = await prisma.title.findUnique({ where: { id } })
						console.log('entre', original)
						if (original) {
							console.log('entre')
							const copiedTitleIds = [...original.title_ids] // Copia del array de title_ids
							const copiedProjectItems = [...original.project_items] // Copia del array de project_items

							await prisma.subBudget.update({
								where: { id: parentFound?.sub_budget_id },
								data: {
									titles: {
										connect: copiedTitleIds.map((titleId) => ({ id: titleId })),
									},
								},
							})
							await prisma.title.update({
								where: {
									id: copiedTitleIds[0],
								},
								data: {
									project_items: copiedProjectItems,
								},
							})
							await prisma.title.delete({ where: { id } })
							res.status(200).json('Title deleted')
						}
					}
				}
			} else if (parentFound?.title_id) {
				const titleHasFound = await prisma.title.findUnique({
					where: { id: parentFound.title_id },
				})

				console.log(titleHasFound, id)
				const auxTitle = titleHasFound?.title_ids 
				const auxItemProject = titleHasFound?.project_items 
				let newAuxTitle = auxTitle ? parentFound.title_ids.concat(auxTitle) : parentFound.title_ids;
				const newAuxItemProject = auxItemProject ? parentFound.project_items.concat(auxItemProject) : parentFound.project_items;
			  
				if(newAuxTitle.includes(id)){
					newAuxTitle = newAuxTitle.filter(e=> e===id)
				}
				const position = titleHasFound?.title_ids.findIndex((obj) => obj === id)
				console.log(position===0, newAuxTitle,newAuxItemProject)
				if ( position === 0 ) {
					console.log("entre al if")
					const auxId = titleHasFound?.title_ids[1]

					if (!auxId) {
						console.log("No tengo hermanos")
						
						await prisma.title.update({ where: { id: parentFound.title_id }, data: {
							title_ids: newAuxTitle,
							project_items: newAuxItemProject
						} })
						await prisma.title.delete({where: {id}})
						res.status(200).json("Title that belongs to a title has been deleted")
					}else {
						res.status(200).json("No esta en la posicion 0")
					}

					/* 						if (auxId) {
							const original = await prisma.title.findUnique({ where: { id: auxId } })
							if (original) {
								const copiedTitleIds = [...original.title_ids] // Copia del array de title_ids
								const copiedProjectItems = [...original.project_items] // Copia del array de project_items

								copiedTitleIds.push(...auxTitle)
								copiedProjectItems.push(...auxItemProject)
								await prisma.title.update({
									where: { id: auxId },
									data: {
										title_ids: copiedTitleIds,
										project_items: copiedProjectItems,
									},
								})
								await prisma.title.delete({ where: { id } })

								res.status(200).json({ message: 'Title deleted successfully' })
							} else {
								return res.status(400).json("Can't delete this title")
							}
						}
					} else if (position && position > 0) {
						const auxId = titleHasFound?.child_titles[0].id
						if (auxId !== undefined) {
							const original = await prisma.title.findUnique({ where: { id: auxId } })
							if (original) {
								const copiedTitleIds = [...original.title_ids] // Copia del array de title_ids
								const copiedProjectItems = [...original.project_items] // Copia del array de project_items

								copiedTitleIds.push(...auxTitle)
								copiedProjectItems.push(...auxItemProject)
								await prisma.title.update({
									where: { id: auxId },
									data: {
										title_ids: copiedTitleIds,
										project_items: copiedProjectItems,
									},
								})
								await prisma.title.delete({ where: { id } })

								res.status(200).json({ message: 'Title deleted successfully' })
							} else {
								return res.status(400).json("Can't delete this title")
							}
						}
						res.status(400).json('Something went wrong')*/
				}
			} else {
				res.status(400).json('Invalid title')
			}
		} catch (error) {
			res.status(400).json({ error, message: 'Unable to delete the title' })
		}
	}
}
