import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER'})

const userCanSomeoneElse = ability.can('invite', 'User')
const userCanDeleteOtherUser = ability.can('delete', 'User')
const userCannotDeleteOtherUser = ability.cannot('delete', 'User')

console.log(userCanSomeoneElse)
console.log(userCanDeleteOtherUser)
console.log(userCannotDeleteOtherUser)
