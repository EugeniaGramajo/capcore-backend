const env = {
	port: process.env.PORT || 3000,
	secretKey: process.env.SECRET_KEY || 'secret',
	databaseUrl: process.env.DATABASE_URL
}
export default env
