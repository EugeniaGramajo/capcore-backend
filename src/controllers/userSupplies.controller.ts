import { Request, Response } from 'express'
import prisma from '../config/prisma-client.config'

export default class UserSupplyController{
    async getUserSupply(req: Request, res: Response){
        try {
			const userSupply = await prisma.userSupply.findMany()
			res.json(userSupply)
		} catch (error) {
			res.status(500).json({ error })
		}
    }
    async postUserSupply(req: Request, res: Response) {
        try{
            const { name, price, image, url, measurement_unit, type, source_supply_id, user_id, unifiedIndex_id } = req.body
            console.log('body', req.body)
            const userSupplyData = {
                name,
                price, 
                image, 
                url, 
                measurement_unit, 
                type, 
                source_supply_id, 
                user_id, 
                unifiedIndex_id
            }
            const userSupply = await prisma.userSupply.create({
                data: userSupplyData
            })
            res.json(userSupply)
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: 'Something went wrong' })
        }
    }
    async getUserSupplyById(req: Request, res: Response) {
        try {
			const { id } = req.params
			const userSupply = await prisma.userSupply.findUnique({
				where: {
					id: id
				}
			})
			if (!userSupply) {
				return res.status(404).json({ error: 'User supply not found' })
			}
			res.json(userSupply)
		} catch (error) {
			res.status(400).json({ error })
		}
    }
    async updateUserSupply(req: Request, res: Response) {
        try {
			const { id } = req.params
			const { name, price, image, url, measurement_unit, type, source_supply_id, user_id } = req.body
			const existingUserSupply = await prisma.userSupply.findUnique({
				where: {
					id: id
				}
			})
			if (!existingUserSupply) {
				return res.status(404).json({ error: 'User not found' })
			}
			const userSupplyData = {
				name: name || existingUserSupply.name,
				price: price || existingUserSupply.price, 
                image: image || existingUserSupply.image, 
                url: url || existingUserSupply.url, 
                measurement_unit: measurement_unit|| existingUserSupply.measurement_unit, 
                type: type || existingUserSupply.type, 
                source_supply_id: source_supply_id || existingUserSupply.source_supply_id, 
                user_id: user_id || existingUserSupply.user_id
			}
			const updatedUserSupply = await prisma.user.update({
				where: {
					id: id
				},
				data: userSupplyData
			})
			res.json(updatedUserSupply)
		} catch (error) {
			res.status(400).json({ error: error })
		}
    }
    async deleteUserSupply(req: Request, res: Response){
        try {
			const { id } = req.params
			const existingUserSupply = await prisma.userSupply.findUnique({
				where: {
					id: id
				}
			})
			if (!existingUserSupply) {
				return res.status(404).json({ error: 'Not found' })
			}
			await prisma.userSupply.delete({
				where: {
					id: id
				}
			})
			res.json({ message: 'User supply deleted' })
		} catch (error) {
			res.status(400).json({ error })
		}
    }
}