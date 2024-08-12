import {
  createMongoAbility,
  ForcedSubject,
  CreateAbility,
  MongoAbility,
} from '@casl/ability'

const actions = ['manage', 'invite'] as const
const subjects = ['User', 'all'] as const
type AppAbilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
]

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>
