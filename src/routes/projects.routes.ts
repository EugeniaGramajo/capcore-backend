import { Router } from 'express'
import ProjectsController from '@/controllers/projects.controller'

const projectsRouter = Router()
const projectsController = new ProjectsController()

projectsRouter.get('/', projectsController.getAllProjects)

projectsRouter.post('/', projectsController.createProject)

projectsRouter.put('/', projectsController.updateProject)

projectsRouter.delete('/', projectsController.deleteProject)

export default projectsRouter
