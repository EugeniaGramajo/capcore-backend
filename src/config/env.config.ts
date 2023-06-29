const env = {
	port: process.env.PORT || 3000,
	secretKey: process.env.SECRET_KEY || 'secret',
	databaseUrl: process.env.DATABASE_URL,
	api_key_cintia: process.env.API_KEY_CINTIA,
	api_key_juje: process.env.api_key_juje,
	api_key_marce: process.env.api_key_marce,
	knasta: process.env.knasta,
	pamer_peru: process.env.pamer_peru,
	promart_token_ladrillos: process.env.PROMART_TOKEN_LADRILLOS,
	promart_token_pintura: process.env.PROMART_TOKEN_PINTURA,
	promart_token_cemento: process.env.PROMART_TOKEN_CEMENTO,
	run_token_dartel: process.env.run_token_dartel,
	run_token_ferreteria_jireh:process.env.run_token_ferreteria_jireh,
	ferreteria_jireh:process.env.ferreteria_jireh,
	datel:process.env.datel
}
export default env
