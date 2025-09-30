'use client'
import React, { useEffect, useState } from 'react'

// Components
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

// Icons
import { Moon, Sun } from 'lucide-react'

interface DarkMode{
  loading:boolean
}

export const DarkMode: React.FC<DarkMode> = ({ loading }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  return (
    loading ?
    <SidebarMenuButton className="cursor-pointer" onClick={toggleTheme}>
      {isDark ? <Sun /> : <Moon />}
      <span>{isDark ? 'Light' :'Dark'}</span>
    </SidebarMenuButton>
    :
    <SidebarMenuButton className='!m-0'>
      <Skeleton className="h-4 w-full" />
    </SidebarMenuButton>
  )
}
