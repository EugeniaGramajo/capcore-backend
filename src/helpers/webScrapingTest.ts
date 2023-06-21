import axios from 'axios'
import prisma from '@/config/prisma-client.config'
const API_KEY_TEST: string = 'tYyRRugwWeYY'
const PROJECT_KEY_TEST: string = 'tW4TyC2SGUT1'
const API_KEY: string = 'tA8dczsLsQjc'
// const PROMART_TOKEN_LADRILLOS: string = 'tFN1XKQJAeOn';
const PROMART_TOKEN_PINTURA: string = 'tw-xVZvNOTV2'
const URL_UI = 'http://localhost:3001/api/unifiedIndex/UI'
// const PROMART_TOKEN_CEMENTO: string = 'tTFCWddruc_Y';
const runProject = async (api_key: string, project_key: string): Promise<any> => {
	try {
		const response = await axios.post(
			`https://www.parsehub.com/api/v2/projects/${project_key}/run`,
			{ api_key: api_key },
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		)
		return response.data
	} catch (error) {
		console.error(error)
	}
}
const checkRun = async (runToken: string, api_key: string): Promise<any> => {
	const response = await axios.get(
		`https://www.parsehub.com/api/v2/runs/${runToken}?api_key=${api_key}`
	)
	return response.data
}

const getData = async (runToken: string, api_key: string): Promise<any> => {
	const response = await axios.get(
		`https://parsehub.com/api/v2/runs/${runToken}/data?api_key=${api_key}`
	)
	return response.data
}

export const getArgentinaTime = async (): Promise<any> => {
	const runToken = (await runProject(API_KEY_TEST, PROJECT_KEY_TEST)).run_token
	try {
		while (true) {
			const { status } = await checkRun(runToken, API_KEY_TEST)
			if (status === 'complete') {
				const time = await getData(runToken, API_KEY_TEST)
				return time.selection1
			} else {
				await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for 3 seconds
			}
		}
	} catch (e) {
		console.log(e)
	}
}

export const getPinturaScraping = async (): Promise<any> => {
	const runToken = (await runProject(API_KEY, PROMART_TOKEN_PINTURA)).run_token
	try {
		while (true) {
			const { status } = await checkRun(runToken, API_KEY)
			if (status === 'complete') {
				const { product } = await getData(runToken, API_KEY)
				const dataUI = await axios.get(URL_UI)
				const UI = dataUI.data[0]
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
				return infoSupply
			} else {
				await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for 3 seconds
			}
		}
	} catch (e) {
		console.log(e)
	}
}
