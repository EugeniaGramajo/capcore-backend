import cron from 'node-cron'
import {
	getCementoPromartScrapping,
	getLadrilloPromartScrapping,
	getPinturaPromartScrapping
} from './webScrapingTest'

export const startScheduler = (): void => {
	//Setea el intervalo en este caso es cada 10minutos
	cron.schedule('*/10 * * * *', async () => {
		try {
			await getPinturaPromartScrapping()
			await getCementoPromartScrapping()
			await getLadrilloPromartScrapping()
			console.log('Se actualizo pintura, ladrillo y cemento')
		} catch (error) {
			console.error('Error executing getPinturaScraping:', error)
		}
	})
}
