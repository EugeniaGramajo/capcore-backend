import { Request, Response } from 'express'
import prisma from '../config/prisma-client.config'

export default class UnifiedIndexController{
    async getUnifiedIndex(req: Request, res: Response){
        try {
			const unifiedIndex = await prisma.unifiedIndex.findMany()
			res.json(unifiedIndex)
		} catch (error) {
			res.status(500).json({ error })
		}
    }
    async postUnifiedIndex(req: Request, res: Response) {
        try{
            const { name, index } = req.body
            console.log('body', req.body)
            const unifiedIndexData = {
                name,
                index
            }
            const unifiedIndex = await prisma.unifiedIndex.create({
                data: unifiedIndexData
            })
            res.json(unifiedIndex)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: 'Something went wrong' })
        }
    }
    async getUnifiedIndexById(req: Request, res: Response) {
        try {
			const { id } = req.params
			const UI = await prisma.unifiedIndex.findUnique({
				where: {
					id: id
				}
			})
			if (!UI) {
				return res.status(404).json({ error: 'User not found' })
			}
			res.json(UI)
		} catch (error) {
			res.status(400).json({ error })
		}
    }
    async updateUnifiedIndex(req: Request, res: Response) {
        try {
			const { id } = req.params
			const { name, index } = req.body
			const existingUI = await prisma.unifiedIndex.findUnique({
				where: {
					id: id
				}
			})
			if (!existingUI) {
				return res.status(404).json({ error: 'User not found' })
			}
			const unifiedIndexData = {
				name: name || existingUI.name,
				index: index || existingUI.index
			}
			const updatedUI = await prisma.user.update({
				where: {
					id: id
				},
				data: unifiedIndexData
			})
			res.json(updatedUI)
		} catch (error) {
			res.status(400).json({ error: error })
		}
    }
    async deleteUnifiedIndex(req: Request, res: Response){
        try {
			const { id } = req.params
			const existingUI = await prisma.unifiedIndex.findUnique({
				where: {
					id: id
				}
			})
			if (!existingUI) {
				return res.status(404).json({ error: 'Not found' })
			}
			await prisma.unifiedIndex.delete({
				where: {
					id: id
				}
			})
			res.json({ message: 'Unified Index deleted' })
		} catch (error) {
			res.status(400).json({ error })
		}
    }
}