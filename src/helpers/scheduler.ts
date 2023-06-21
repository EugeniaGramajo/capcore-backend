import cron from 'node-cron'
import { getPinturaScraping } from './webScrapingTest'

export const startScheduler = (): void => {
	// Schedule the execution of getArgentinaTime every 15 seconds
	// cron.schedule('*/15 * * * * *', async () => {
	// 	try {
	// 		const data = await getArgentinaTime()
	// 		console.log(`Cada 15 segundos: Argentina Time : ${data}`)
	// 	} catch (error) {
	// 		console.error('Error executing getArgentinaTime:', error)
	// 	}
	// })

	// Schedule the execution of getPinturaScraping every 30 seconds
	cron.schedule('*/30 * * * * *', async () => {
		try {
			const data = await getPinturaScraping()
			console.log(`Cada 30 segundos: Pintura Scraper : ${data}`)
		} catch (error) {
			console.error('Error executing getPinturaScraping:', error)
		}
	})
}
