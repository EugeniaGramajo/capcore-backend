import cron from 'node-cron'
import { getPinturaScraping, getArgentinaTime } from './webScrapingTest'

export const startScheduler = (): void => {
	cron.schedule('*/15 * * * * *', async () => {
		try {
			const data = await getArgentinaTime()
			console.log(`Cada 15 segundos: Argentina Time : ${data}`)
		} catch (error) {
			console.error('Error executing getArgentinaTime:', error)
		}
	})

	cron.schedule('*/30 * * * * *', async () => {
		try {
			await getPinturaScraping()
		} catch (error) {
			console.error('Error executing getPinturaScraping:', error)
		}
	})
	// cron.schedule('*/30 * * * * *', async () => {
	// 	try {
	// 		await getCementoScraping()
	// 	} catch (error) {
	// 		console.error('Error executing getCementoScraping:', error)
	// 	}
	// })
}
