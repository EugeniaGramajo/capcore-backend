const env = {
	port: process.env.PORT || 3000,
	secretKey: process.env.SECRET_KEY || 'secret',
	databaseUrl: process.env.DATABASE_URL,
	api_key: process.env.API_KEY,
	promart_token_ladrillos: process.env.PROMART_TOKEN_LADRILLOS,
	promart_token_pintura: process.env.PROMART_TOKEN_PINTURA,
	promart_token_cemento: process.env.PROMART_TOKEN_CEMENTO,
}
export default env
