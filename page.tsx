import { ProjectList } from "./apps/web/src/app/(app)/org/[slug]/(project)/project-list";

export default async function Projects() {
  return (
    <div className="space-y-4">
      <ProjectList />
    </div>
  )
}
