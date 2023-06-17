import prisma from '@/config/prisma-client.config'
import { Request, Response } from 'express'



export default class ProjectsController {
	async getAllProjects(req: Request, res: Response) {
		try {
           const allProjects = await prisma.project.findMany()
            res.status(200).json(allProjects)
		} catch (error) {
            res.status(400).json(error, )
        }
	}

/*     async getProjectById(req: Request, res: Response)  {
        try {
           const { id } = req.query
           if(id){
            const projectById = await prisma.project.findUnique({id})
           }
            
        } catch (error) {
            
        }
    } */

	async createProject(req: Request, res: Response) {
		try {
            console.log("narnia")
            const dataProject = req.body
            console.log(dataProject)
            const project = await prisma.project.create({data:dataProject})
            console.log(project)
            res.status(200).json({message:"Project creation succedded!",project})
            
		} catch (error) {
            res.status(400).json({error,message:"puto"})
        }
	}

	async updateProject(req: Request, res: Response) {
		try {
		} catch (error) {}
	}

	async deleteProject(req: Request, res: Response) {
		try {
		} catch (error) {}
	}
}
