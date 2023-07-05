import { Request, Response } from 'express'
import prisma from '../config/prisma-client.config'
import env from '../config/env.config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKey = env.secretKey

export class UserController {
	async getUsers(req: Request, res: Response) {
		try {
			const users = await prisma.user.findMany({
				include: {
					clients: true
				}
			})
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
				}, include:{
					clients:true
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
			const { name, email, password } = req.body
			// Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [{ email }]
				}
			})

			if (existingUser) {
				return res.status(400).json({ error: 'Email already exists' })
			}

			// Generar el hash de la contraseña
			const pw_hash = await bcrypt.hash(password, 10)

			// Crear el usuario en la base de datos
			const userData = {
				name,
				email,
				pw_hash,
				verification_code: 0
			}

			const user = await prisma.user.create({
				data: userData
			})

			// Generar el token de autenticación
			const token = jwt.sign({ userId: user.id }, secretKey)
			res.json({ token, user })
		} catch (error) {
			console.log(error)
			res.status(400).json({ error: 'Something went wrong' })
		}
	}

	async loginUser(req: Request, res: Response) {
		try {
			const { email, password } = req.body
			if (!email || !password) {
				return res.status(400).json({ error: 'Email and password are required' })
			}
			// Buscar al usuario por nombre de usuario
			const user = await prisma.user.findUnique({
				where: {
					email
				}
			})

			if (!user) {
				return res.status(400).json({ error: 'Email or password are incorrect' })
			}

			// Verificar la contraseña
			const passwordMatch = await bcrypt.compare(password, user.pw_hash)

			if (!passwordMatch) {
				return res.status(400).json({ error: 'Email or password are incorrect' })
			}

			// Generar el token de autenticación
			const token = jwt.sign({ userId: user.id }, secretKey)
			res.json({ token, user })
		} catch (error) {
			res.status(400).json({ error: error })
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
}
