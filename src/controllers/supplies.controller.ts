import env from '../config/env.config'
import axios from 'axios'
import { Request, Response } from 'express'
import prisma from '../config/prisma-client.config'
const URL_UI = 'http://localhost:3001/api/unifiedIndex/UI'
const URL_parse = `https://parsehub.com/api/v2/projects/${env.promart_token_pintura}/last_ready_run/data?api_key=${env.api_key_cintia}`
export default class SupplyController {
	async getSupplies(req: Request, res: Response) {
		try {
			const supplies = await prisma.supply.findMany({include:{
				unifiedindex:true
			}})
			res.json(supplies)
		} catch (error) {
			console.log(error)
			res.status(500).json({ error: 'Something went wrong' })
		}
	}
	async getParseHub(req: Request, res: Response) {
		try {
			const dataUI = await axios.get(URL_UI)
			const UI = dataUI.data[0]
			const dataParseHub = await axios.get(URL_parse)
			const product = dataParseHub.data.product
			let infoSupply = product.map(function(supply: any) {
				return {
					name: supply.name,
					price: parseFloat(supply.price.replace('S/ ', '')),
					image: supply.image,
					url: supply.url,
					measurement_unit: '4L',
					type: 'MATERIAL',
					unifiedIndex_id: UI.id
				}
			})
			await prisma.supply.createMany({
				data: infoSupply
			})
			res.json(infoSupply)
		} catch (error) {
			console.log(error)
			res.status(500).json({ error: 'Error al obtener los datos de ParseHub' })
		}
	}
	async postSupply(req: Request, res: Response) {
		try {
			const { name, price, image, url, measurement_unit, type } = req.body
			const supplyData = {
				name,
				price,
				image,
				url,
				measurement_unit,
				type
			}
			const supply = await prisma.supply.create({
				data: supplyData
			})
			res.json(supply)
		} catch (error) {
			console.log(error)
			res.status(400).json({ error: 'Something went wrong' })
		}
	}
	async getSupplyById(req: Request, res: Response) {
		try {
			const { id } = req.params
			const supply = await prisma.supply.findUnique({
				where: {
					id: id
				}
			})
			if (!supply) {
				return res.status(404).json({ error: 'Supply not found' })
			}
			res.json(supply)
		} catch (error) {
			res.status(400).json({ error })
		}
	}
	async getSuppliesScrapping(req: Request, res: Response){
		try {
			const supply = await prisma.supplyFromWebScrapping.findMany()
			res.status(200).json(supply)
		} catch (error) {
			res.status(400).json("asiuda")
		}
	}

	async getAllSuppliesTheUserCanSelectForProjects(req: Request, res: Response){
		try {
			const {id}=req.params
			const db = await prisma.supply.findMany()
			const user = await prisma.userSupply.findMany({where:{user_id:id}})
			res.status(200).json(db.concat(user))
		} catch (error) {
			res.status(400).json(error)
		}
	}
}
