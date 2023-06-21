import { Request, Response, NextFunction } from 'express'
import prisma from '../config/prisma-client.config'
import env from '../config/env.config'
import jwt from 'jsonwebtoken'

interface DecodedToken {
	id: string
}
const secretKey = env.secretKey

// Middleware para verificar si esta autentificado
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	// Verifica si el encabezado de autorización existe
	const authHeader = req.headers['authorization']
	if (!authHeader) {
		return res.status(401).json({ error: 'No se proporcionó un token de autenticación' })
	}

	// Verifica el formato del encabezado de autorización
	const [bearer, token] = authHeader.split(' ')
	if (bearer !== 'Bearer' || !token) {
		return res.status(401).json({ error: 'Formato de token inválido' })
	}

	try {
		const decodedToken = jwt.verify(token, secretKey)
		// Obtiene el usuario del token JWT
		const user = prisma.user.findUnique({
			where: {
				id: (decodedToken as DecodedToken).id
			}
		})
		// Verifica si el usuario existe
		if (!user) {
			return res.status(401).json({ error: 'Usuario no encontrado' })
		}

		next()
	} catch (err) {
		return res.status(401).json({ error: 'Token de autenticación inválido' })
	}
}
