import { defineAbilityFor, type Role } from '@saas/auth'
import { userSchema } from '@saas/auth/src/models/user'

export function getUserPermissions(userId: string, role: Role) {
  const authUser = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}