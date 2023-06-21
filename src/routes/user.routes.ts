import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
const userRouter = Router()
const userController = new UserController()

// Ruta para iniciar sesión
userRouter.post('/login', userController.loginUser)

// Ruta para registrar un nuevo usuario
userRouter.post('/register', userController.registerUser)

// Ruta para obtener todos los usuarios se necesita estar autentificado
userRouter.get('/', authMiddleware, userController.getUsers)

// Ruta para obtener un usuario por su ID se necesita estar autentificado
userRouter.get('/:id', authMiddleware, userController.getUserById)

// Ruta para actualizar un usuario se necesita estar autentificado
userRouter.put('/:id', authMiddleware, userController.updateUser)

// Ruta para eliminar un usuario se necesita estar autentificado
userRouter.delete('/:id', authMiddleware, userController.deleteUser)

export default userRouter
