import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '../../../lib/prisma'
import z from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/profile',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Get authenticated user profile',
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              email: z.string().email(),
              name: z.string().nullable(),
              avatarUrl: z.string().url().nullable(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      const user = await prisma.user.findUnique({
        where: {
          id: sub,
        },
        select: {
          id: true,
          email: true,
          name: true,
          avatarUrl: true,
        },
      })

      if (!user) {
        throw new BadRequestError('User not found')
      }

      return reply.send({ user })
    }
  )
}
