import React from 'react'

// Components
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { DarkMode } from '@/components/ui/dark-mode'

export const Header = ({ loading }: { loading: boolean }) => {

  return (
    <header className='flex items-center w-full p-2'>
      <SidebarTrigger />
      <div className='flex items-center w-full sm:justify-end justify-between'>
        <div className='sm:hidden uppercase font-semibold text-gray-800 dark:text-white'>
          Influencer
        </div>

        <div className='flex items-center gap-2 text-nowrap'>
          <DarkMode loading={!loading} />

          <div className='max-sm:hidden'>
            <Tooltip>
              <TooltipTrigger>
                <a href="/profile" className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="uppercase font-bold text-sm">
                      TS
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start -space-y-0.5 capitalize">
                    <span className="font-semibold line-clamp-1 text-xs">
                      Taha Şahin
                    </span>
                    <p className="!text-[10px] line-clamp-1">Administrator</p>
                  </div>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to profile</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  )
}
