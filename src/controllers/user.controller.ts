import { Request, Response } from 'express'
import prisma from '../config/prisma-client.config'
import env from '../config/env.config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKey = env.secretKey // Cambia esto por una clave secreta más segura

export class UserController {
	async getUsers(req: Request, res: Response) {
		try {
			const users = await prisma.user.findMany()
			res.json(users)
		} catch (error) {
			res.status(500).json({ error })
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
			res.status(400).json({ error })
		}
	}

	async registerUser(req: Request, res: Response) {
		try {
			const { name, email, password, business_name, profession } = req.body
			console.log(req.body)
			// Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [{ email }]
				}
			})

			if (existingUser) {
				return res.status(400).json({ error: 'Username or email already exists' })
			}

			// Generar el hash de la contraseña
			const pw_hash = await bcrypt.hash(password, 10)

			// Crear el usuario en la base de datos
			const userData = {
				name,
				email,
				pw_hash,
				business_name,
				profession,
				verification_code: 0
			}

			const user = await prisma.user.create({
				data: userData
			})

			// Generar el token de autenticación
			const token = jwt.sign({ userId: user.id }, secretKey)

			res.json({ token })
		} catch (error) {
			console.log(error)
			res.status(400).json({ error: 'Something went wrong' })
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { name, email, password, business_name, profession } = req.body

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
				name: name || existingUser.name,
				email: email || existingUser.email,
				pw_hash,
				business_name: business_name || existingUser.business_name,
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
			res.status(400).json({ error: error })
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
			res.status(400).json({ error })
		}
	}

	async loginUser(req: Request, res: Response) {
		try {
			const { email, password } = req.body

			// Buscar al usuario por nombre de usuario
			const user = await prisma.user.findUnique({
				where: {
					email
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
			res.status(400).json({ error: error })
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
			res.status(400).json({ error: error })
		}
	}
}
