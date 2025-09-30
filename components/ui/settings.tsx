'use client'
import React from 'react'

// Components
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

// Icons
import {  SettingsIcon } from 'lucide-react'

interface Settings{
  loading:boolean
}

export const Settings: React.FC<Settings> = ({ loading }) => {

  return (
    loading ?
    <SidebarMenuButton className="cursor-pointer">
      <SettingsIcon />
      Settings
    </SidebarMenuButton>
    :
    <SidebarMenuButton className='!m-0'>
      <Skeleton className="h-4 w-full" />
    </SidebarMenuButton>
  )
}
