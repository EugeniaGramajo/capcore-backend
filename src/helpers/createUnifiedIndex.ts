import prisma from '@/config/prisma-client.config'
import { unifiedIndexes } from '@/utils/unifiedIndex'

export async function createUnifiedIndexes() {
  try {
    for (const index of unifiedIndexes) {
      const existingIndex = await prisma.unifiedIndex.findUnique({
        where: {
          index: index.index,
        }
      })

      if (!existingIndex) {
        await prisma.unifiedIndex.create({
          data: index
        })
      }
    }

    console.log('Todos los índices unificados se han creado o verificado correctamente.')
  } catch (error) {
    console.error('Error al crear o verificar los índices unificados:', error)
  }
}
