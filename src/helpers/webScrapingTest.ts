import axios from 'axios'
import prisma from '@/config/prisma-client.config'
import env from '@/config/env.config'
const API_KEY = env.api_key
const PROMART_TOKEN_LADRILLOS = env.promart_token_ladrillos
const PROMART_TOKEN_PINTURA = env.promart_token_pintura
const PROMART_TOKEN_CEMENTO = env.promart_token_cemento
const runProject = async (api_key: string, project_key: string) => {
	try {
		const response = await axios.post(
			`https://www.parsehub.com/api/v2/projects/${project_key}/run`,
			{ api_key },
			{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
		)
		const runToken = response.data.run_token

		while (true) {
			const response = await axios.get(
				`https://www.parsehub.com/api/v2/runs/${runToken}?api_key=${api_key}`
			)

			if (response.data.status === 'complete') {
				const { data } = await axios.get(
					`https://parsehub.com/api/v2/runs/${runToken}/data?api_key=${api_key}`
				)
				return data
			} else {
				await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for 3 seconds
			}
		}
	} catch (error) {
		console.error(error)
	}
}

export const getPinturaPromartScrapping = async (): Promise<any> => {
	try {
		if (API_KEY && PROMART_TOKEN_PINTURA) {
			const data = await runProject(API_KEY, PROMART_TOKEN_PINTURA)
			const UI = await prisma.unifiedIndex.findFirst({
				where: {
					index: 54
				}
			})
			let infoSupply = data.product.map(function(supply: any) {
				return {
					name: supply.name,
					price: parseFloat(supply?.price.replace('S/ ', '')),
					image: supply.image,
					url: supply.url,
					measurement_unit: '4L',
					type: 'MATERIAL',
					unifiedIndex_id: UI?.id
				}
			})
			infoSupply.map(async (supply: any) => {
				return await prisma.supply.upsert({
					where: {
						url: supply.url
					},
					update: {
						...supply
					},
					create: supply
				})
			})
			return infoSupply
		} else {
			throw new Error('API_KEY or PROMART_TOKEN_PINTURA not found')
		}
	} catch (e) {
		console.log(e)
	}
}

export const getCementoPromartScrapping = async (): Promise<any> => {
	try {
		if (API_KEY && PROMART_TOKEN_CEMENTO) {
			const data = await runProject(API_KEY, PROMART_TOKEN_CEMENTO)
			const dataClean = data.product.filter((supply: any) => supply?.price !== undefined)
			const UI = await prisma.unifiedIndex.findFirst({
				where: {
					index: 20
				}
			})
			let infoSupply = dataClean.map(function(supply: any) {
				return {
					name: supply.name,
					price: parseFloat(supply?.price.replace('S/ ', '')),
					image: supply.image || null,
					url: supply.url || 'prueba',
					measurement_unit: '1BLS',
					type: 'MATERIAL',
					unifiedIndex_id: UI?.id
				}
			})

			infoSupply.map(async (supply: any) => {
				return await prisma.supply.upsert({
					where: {
						url: supply.url
					},
					update: {
						...supply
					},
					create: supply
				})
			})
			return infoSupply
		} else {
			throw new Error('API_KEY or PROMART_TOKEN_PINTURA not found')
		}
	} catch (e) {
		console.log(e)
	}
}
export const getLadrilloPromartScrapping = async (): Promise<any> => {
	try {
		if (API_KEY && PROMART_TOKEN_LADRILLOS) {
			const data = await runProject(API_KEY, PROMART_TOKEN_LADRILLOS)
			const dataClean = data.product.filter((supply: any) => supply?.price !== undefined)
			const UI = await prisma.unifiedIndex.findFirst({
				where: {
					index: 17
				}
			})
			let infoSupply = dataClean.map(function(supply: any) {
				return {
					name: supply.name,
					price: parseFloat(supply?.price.replace('S/ ', '')),
					image: supply.image || null,
					url: supply.url || 'prueba',
					measurement_unit: '1UN',
					type: 'MATERIAL',
					unifiedIndex_id: UI?.id
				}
			})

			infoSupply.map(async (supply: any) => {
				return await prisma.supply.upsert({
					where: {
						url: supply.url
					},
					update: {
						...supply
					},
					create: supply
				})
			})
			return infoSupply
		} else {
			throw new Error('API_KEY or PROMART_TOKEN_LADRILLOS not found')
		}
	} catch (e) {
		console.log(e)
	}
}
