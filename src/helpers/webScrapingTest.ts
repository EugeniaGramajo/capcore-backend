import axios from 'axios'
// import prisma from '@/config/prisma-client.config'
// import env from '@/config/env.config'
const API_KEY_TEST: string = 'tYyRRugwWeYY'
const PROJECT_KEY_TEST: string = 'tW4TyC2SGUT1'
// const API_KEY = env.api_key
// const PROMART_TOKEN_LADRILLOS = env.promart_token_ladrillos
// const PROMART_TOKEN_PINTURA = env.promart_token_pintura
// const PROMART_TOKEN_CEMENTO = env.promart_token_cemento

// const URL_UI = 'http://localhost:3001/api/unifiedIndex/UI'
// const PROMART_TOKEN_CEMENTO: string = 'tTFCWddruc_Y';
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
				const time = await axios.get(
					`https://parsehub.com/api/v2/runs/${runToken}/data?api_key=${api_key}`
				)
				return time.data.selection1
			} else {
				await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for 3 seconds
			}
		}
	} catch (error) {
		console.error(error)
	}
}

export const getArgentinaTime = async () => {
	const result = await runProject(API_KEY_TEST, PROJECT_KEY_TEST)
	return result
}

// export const getPinturaScraping = async (): Promise<any> => {
// 	try {
// 		if (API_KEY && PROMART_TOKEN_PINTURA) {
// 			const runToken = (await runProject(API_KEY, PROMART_TOKEN_PINTURA)).run_token
// 			while (true) {
// 				const { status } = await checkRun(runToken, API_KEY)
// 				if (status === 'complete') {
// 					const { product } = await getData(runToken, API_KEY)
// 					const dataUI = await axios.get(URL_UI)
// 					const UI = dataUI.data[1]
// 					let infoSupply = product.map(function(supply: any) {
// 						return {
// 							name: supply.name,
// 							price: parseFloat(supply?.price.replace('S/ ', '')),
// 							image: supply.image,
// 							url: supply.url,
// 							measurement_unit: '4L',
// 							type: 'MATERIAL',
// 							unifiedIndex_id: UI.id
// 						}
// 					})

// 					await prisma.supply.createMany({
// 						data: infoSupply
// 					})
// 					console.log({ pinturas: infoSupply })
// 					return infoSupply
// 				} else {
// 					await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for 3 seconds
// 				}
// 			}
// 		} else {
// 			throw new Error('API_KEY or PROMART_TOKEN_PINTURA not found')
// 		}
// 	} catch (e) {
// 		console.log(e)
// 	}
// }
// export const getCementoScraping = async (): Promise<any> => {
// 	try {
// 		if (API_KEY && PROMART_TOKEN_CEMENTO) {
// 			const runToken = (await runProject(API_KEY, PROMART_TOKEN_CEMENTO)).run_token
// 			while (true) {
// 				const { status } = await checkRun(runToken, API_KEY)
// 				if (status === 'complete') {
// 					const { product } = await getData(runToken, API_KEY)
// 					const dataUI = await axios.get(URL_UI)
// 					const UI = dataUI.data[0]
// 					let infoSupply = product.map(function(supply: any) {
// 						return {
// 							name: supply.name,
// 							price: parseFloat(supply?.price.replace('S/ ', '')),
// 							image: supply.image,
// 							url: supply.url,
// 							measurement_unit: '1BLS',
// 							type: 'MATERIAL',
// 							unifiedIndex_id: UI.id
// 						}
// 					})
// 					await prisma.supply.createMany({
// 						data: infoSupply
// 					})
// 					console.log({ cemento: infoSupply })
// 					return infoSupply
// 				} else {
// 					await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for 3 seconds
// 				}
// 			}
// 		} else {
// 			throw new Error('API_KEY or PROMART_TOKEN_PINTURA not found')
// 		}
// 	} catch (e) {
// 		console.log(e)
// 	}
// }
