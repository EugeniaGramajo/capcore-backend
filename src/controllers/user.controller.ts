import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import env from '../config/env.config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const secretKey = env.secretKey // Cambia esto por una clave secreta más segura

export class UserController {
	async getUsers(req: Request, res: Response) {
		try {
			const users = await prisma.user.findMany()
			res.json(users)
		} catch (error) {
			console.error('Error retrieving users:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	}

	async getUserById(req: Request, res: Response) {
		try {
			const { id } = req.params
			const user = await prisma.user.findUnique({
				where: {
					id: id
				}
			})

			if (!user) {
				return res.status(404).json({ error: 'User not found' })
			}

			res.json(user)
		} catch (error) {
			console.error('Error retrieving user:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	}

	async registerUser(req: Request, res: Response) {
		try {
			const { username, full_name, email, password, organization, profession } = req.body

			// Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [{ username }, { email }]
				}
			})

			if (existingUser) {
				return res.status(400).json({ error: 'Username or email already exists' })
			}

			// Generar el hash de la contraseña
			const pw_hash = await bcrypt.hash(password, 10)

			// Crear el usuario en la base de datos
			const userData = {
				username,
				full_name,
				email,
				pw_hash,
				organization,
				profession
			}

			const user = await prisma.user.create({
				data: userData
			})

			// Generar el token de autenticación
			const token = jwt.sign({ userId: user.id }, secretKey)

			res.json({ token })
		} catch (error) {
			console.error('Error during user registration:', error)
			res.status(500).json({ error })
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { username, full_name, email, password, organization, profession } = req.body

			// Verificar si el usuario existe
			const existingUser = await prisma.user.findUnique({
				where: {
					id: id
				}
			})

			if (!existingUser) {
				return res.status(404).json({ error: 'User not found' })
			}

			// Generar el hash de la contraseña
			const pw_hash = password ? await bcrypt.hash(password, 10) : existingUser.pw_hash

			// Actualizar el usuario en la base de datos
			const userData = {
				username: username || existingUser.username,
				full_name: full_name || existingUser.full_name,
				email: email || existingUser.email,
				pw_hash,
				organization: organization || existingUser.organization,
				profession: profession || existingUser.profession
			}

			const updatedUser = await prisma.user.update({
				where: {
					id: id
				},
				data: userData
			})

			res.json(updatedUser)
		} catch (error) {
			console.error('Error updating user:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			const { id } = req.params

			// Verificar si el usuario existe
			const existingUser = await prisma.user.findUnique({
				where: {
					id: id
				}
			})

			if (!existingUser) {
				return res.status(404).json({ error: 'User not found' })
			}

			// Eliminar el usuario de la base de datos
			await prisma.user.delete({
				where: {
					id: id
				}
			})

			res.json({ message: 'User deleted' })
		} catch (error) {
			console.error('Error deleting user:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	}

	async loginUser(req: Request, res: Response) {
		try {
			const { username, password } = req.body

			// Buscar al usuario por nombre de usuario
			const user = await prisma.user.findUnique({
				where: {
					username
				}
			})

			if (!user) {
				return res.status(400).json({ error: 'Invalid credentials' })
			}

			// Verificar la contraseña
			const passwordMatch = await bcrypt.compare(password, user.pw_hash)

			if (!passwordMatch) {
				return res.status(400).json({ error: 'Invalid credentials' })
			}

			// Generar el token de autenticación
			const token = jwt.sign({ userId: user.id }, secretKey)

			res.json({ token })
		} catch (error) {
			console.error('Error during user login:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	}

	async verifyToken(req: Request, res: Response) {
		try {
			const { token } = req.body

			// Verificar el token de autenticación
			jwt.verify(token, secretKey, async (err: any, decoded: any) => {
				if (err) {
					return res.status(401).json({ error: 'Invalid token' })
				}

				const userId = decoded.userId

				// Buscar al usuario en la base de datos
				const user = await prisma.user.findUnique({
					where: {
						id: userId
					}
				})

				if (!user) {
					return res.status(401).json({ error: 'Invalid token' })
				}

				// Token válido, enviar respuesta exitosa
				res.json({ success: true })
			})
		} catch (error) {
			console.error('Error during token verification:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	}
}
