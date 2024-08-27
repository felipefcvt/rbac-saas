import { Slash } from 'lucide-react'
import Image from 'next/image'

import ghIcon from '@/assets/github-icon.svg'

import { OrganizationSwitcher } from './organization-switcher'
import { Separator } from './ui/separator'
import { ProfileButton } from './profile-button'

export async function Header() {
//   const permissions = await ability()

  return (
    <div className="mx-auto flex items-center justify-around py-2">
      <div className="flex items-center gap-3">
        <Image
          src={ghIcon}
          className="size-6 dark:invert"
          alt="Rocketseat"
        />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {/* {permissions?.can('get', 'Project') && (
          <>
            <Slash className="size-3 -rotate-[24deg] text-border" />
            <ProjectSwitcher />
          </>
        )} */}
      </div>

      <div className="flex items-center gap-4">
        {/* <PendingInvites /> */}
        {/* <ThemeSwitcher /> */}
        {/* <Separator orientation="vertical" className="h-5" /> */}
        <ProfileButton />
      </div>
    </div>
  )
}
