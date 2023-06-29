import axios from 'axios'
import prisma from '@/config/prisma-client.config'
import env from '@/config/env.config'
const API_KEY = env.api_key_cintia
const PROMART_TOKEN_LADRILLOS = env.promart_token_ladrillos
const PROMART_TOKEN_PINTURA = env.promart_token_pintura
const PROMART_TOKEN_CEMENTO = env.promart_token_cemento
const API_KEY_2 = env.api_key_juje
const API_KEY_3= env.api_key_marce
const KNASTA = env.knasta
const PAMER_PERU = env.pamer_peru
const FERRETERIA_JIREH = env.ferreteria_jireh
const DATEL = env.datel
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
			console.log(response.data.status)
			if (response.data.status === 'complete') {
				const { data } = await axios.get(
					`https://parsehub.com/api/v2/runs/${runToken}/data?api_key=${api_key}`
				)
				console.log(data)
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
					measurement_unit: 'GL',
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
					measurement_unit: 'BLS',
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
					measurement_unit: 'UN',
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
export const getAllDataCreated = async (): Promise<any> =>{
try {
	if(API_KEY_2 && FERRETERIA_JIREH){
		
		/* const data = await runProject(API_KEY_2, FERRETERIA_JIREH) */
		const data = await axios.get(`https://parsehub.com/api/v2/projects/${FERRETERIA_JIREH}/last_ready_run/data?api_key=${API_KEY_2}`)
		
		let infoSupply = data.data.products.map(function(supply: any) {
			const [namePart, pricePart] = supply.name.split('\n')
			return {
				name: namePart,
				price: parseFloat(pricePart.replace('S/ ', '')),
				image: supply.image,
				url: supply.url,
			}
		})
		infoSupply.map(async (supply:any)=>{
			 await prisma.supplyFromWebScrapping.upsert({
				where: {
					url: supply.url
				},
				update: {
					...supply
				},
				create: supply
			})
		})
		
		} else {
			throw new Error('API_KEY_2 or FERRETERIA_JIREH not found')
		}
		
		if(API_KEY_2 && DATEL){
			/* const data = await runProject(API_KEY_2, DATEL) */
			const data = await axios.get(`https://parsehub.com/api/v2/projects/${DATEL}/last_ready_run/data?api_key=${API_KEY_2}`)
			const dataClean = data.data.products.filter((supply: any) => supply?.price !== undefined)
			let infoSupply = dataClean.map(function(supply: any) {
				return {
					name: supply.name,
					price: parseFloat(supply?.price.replace('S/ ', '')),
					image: supply.image,
					url: supply.url,
				}
			})
			
			infoSupply.map(async (supply:any)=>{
				await prisma.supplyFromWebScrapping.upsert({
					where: {
						url: supply.url
					},
					update: {
						...supply
					},
					create: supply
				})
			})
			} else {
				throw new Error('API_KEY_2 or DATEL not found')
			}
			if(API_KEY_3 && KNASTA){
				/* const data = await runProject(API_KEY_2, DATEL) */
				const data = await axios.get(`https://parsehub.com/api/v2/projects/${KNASTA}/last_ready_run/data?api_key=${API_KEY_3}`)
				const dataClean = data.data.products.filter((supply: any) => supply?.price !== undefined)
				let infoSupply = dataClean.map(function(supply: any) {
					return {
						name: supply.name,
						price: parseFloat(supply?.price.replace('S/ ', '')),
						image: supply.image,
						url: supply.url,
					}
				})
				
				infoSupply.map(async (supply:any)=>{
					await prisma.supplyFromWebScrapping.upsert({
						where: {
							url: supply.url
						},
						update: {
							...supply
						},
						create: supply
					})
				})
				} else {
					throw new Error('API_KEY_2 or DATEL not found')
				}

				if(API_KEY_3 && PAMER_PERU){
					/* const data = await runProject(API_KEY_2, DATEL) */
					const data = await axios.get(`https://parsehub.com/api/v2/projects/${PAMER_PERU}/last_ready_run/data?api_key=${API_KEY_3}`)
					const dataClean = data.data.products.filter((supply: any) => supply?.price !== undefined)
					let infoSupply = dataClean.map(function(supply: any) {
						
						return {
							name: supply.name,
							price: supply.price[1]?.name? parseInt(supply.price[1].name.replace('S/ ', '')) : parseInt(supply.price[0].name.replace('S/ ', '')),
							image: supply.image || "",
							url: supply.url,
						}
					})
					
					infoSupply.map(async (supply:any)=>{
						await prisma.supplyFromWebScrapping.upsert({
							where: {
								url: supply.url
							},
							update: {
								...supply
							},
							create: supply
						})
					})
					} else {
						throw new Error('API_KEY_2 or DATEL not found')
					}

			console.log("all data created")
			return "all data created"
} catch (error) {
	console.log(error)
	return 
}
}
