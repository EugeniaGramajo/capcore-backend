import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = Router()
const userController = new UserController()

// Ruta para registrar un nuevo usuario
userRouter.post('/register', userController.registerUser)

// Ruta para iniciar sesión
userRouter.post('/login', userController.loginUser)

// Ruta para verificar el token de autenticación
userRouter.post('/verify-token', userController.verifyToken)

// Ruta para obtener todos los usuarios
userRouter.get('/', userController.getUsers)

// Ruta para obtener un usuario por su ID
userRouter.get('/:id', userController.getUserById)

// Ruta para actualizar un usuario
userRouter.put('/:id', userController.updateUser)

// Ruta para eliminar un usuario
userRouter.delete('/:id', userController.deleteUser)

export default userRouter
