import { Router } from 'express'
import UnifiedIndexController from '@/controllers/unifiedIndex.controller';

const unifiedIndexRouter = Router()
const unifiedIndexController = new UnifiedIndexController()

// Ruta para obtener todos los indices unificados
unifiedIndexRouter.get('/UI', unifiedIndexController.getUnifiedIndex.bind(unifiedIndexController))

//Ruta para crear indices unificados
unifiedIndexRouter.post('/', unifiedIndexController.postUnifiedIndex)

//Ruta para obtener el indice unificado por ID
unifiedIndexRouter.get('/:id', unifiedIndexController.getUnifiedIndexById)

//Ruta para editar el indice Unificado
unifiedIndexRouter.put('/:id', unifiedIndexController.updateUnifiedIndex)

//Ruta para eliminar el indice unificado
unifiedIndexRouter.delete('/:id', unifiedIndexController.deleteUnifiedIndex)

export default unifiedIndexRouter