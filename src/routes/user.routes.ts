import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
const userRouter = Router()
const userController = new UserController()

// Ruta para registrar un nuevo usuario
userRouter.post('/register', userController.registerUser)

// Ruta para iniciar sesión
userRouter.post('/login', userController.loginUser)

// Ruta para obtener todos los usuarios
userRouter.get('/', authMiddleware, userController.getUsers)

// Ruta para obtener un usuario por su ID
userRouter.get('/:id', authMiddleware, userController.getUserById)

// Ruta para actualizar un usuario
userRouter.put('/:id', userController.updateUser)

// Ruta para eliminar un usuario
userRouter.delete('/:id', userController.deleteUser)

export default userRouter
