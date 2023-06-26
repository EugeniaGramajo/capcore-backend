import { Router } from 'express'
import ProjectsController from '@/controllers/projects.controller'

const projectsRouter = Router()
const projectsController = new ProjectsController()

projectsRouter.get('/', projectsController.getAllProjects)

projectsRouter.get('/:id', projectsController.getProjectById)

projectsRouter.get('/:projectId/:versionId', projectsController.getProjectDataByVersion)

projectsRouter.post('/', projectsController.createProject)

projectsRouter.put('/:id/:editor', projectsController.updateProject)

projectsRouter.delete('/:id', projectsController.deleteProject)

export default projectsRouter
