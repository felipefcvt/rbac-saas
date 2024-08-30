import { OrganizationForm } from "../org/organization-form";

export default function CreateOrganization() {
  return (
    <div className="space-y-4 py-4">
      <main className="mx-auto max-w-[400px] space-y-4">
        <h1 className="text-2xl font-bold">Create organization</h1>

        <OrganizationForm />
      </main>
    </div>
  )
}