import app from './app'
import env from './config/env.config'
import { createUnifiedIndexes } from './helpers/createUnifiedIndex'
import { startScheduler } from './helpers/scheduler'
import { getAllDataCreated } from './helpers/webScrapingTest'

app.listen(env.port, async () => {
	try {
		startScheduler()
		createUnifiedIndexes()
		getAllDataCreated()
		console.log(`Ready on http://localhost:${env.port}`)
	} catch (error) {
		console.log('ERROR:', error)
	}
})

/*
resources
- https://josipmisko.com/posts/rest-api-best-practices
- https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design
*/
