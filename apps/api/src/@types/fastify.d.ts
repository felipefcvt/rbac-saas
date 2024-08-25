import 'fastify'
import { Member, Organization } from '@prisma/client'

export module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(): Promise<{
      organization: Organization
      membership: Member
    }>
  }
}
