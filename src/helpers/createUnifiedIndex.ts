import prisma from '@/config/prisma-client.config'
import { unifiedIndexes } from '@/utils/unifiedIndex'

export async function createUnifiedIndexes() {
	try {
		await prisma.unifiedIndex.createMany({
			data: unifiedIndexes
		})
		console.log('Los índices unificados se han creado correctamente.')
	} catch (error) {
		console.error('Error al crear los índices unificados:', error)
	}
}
