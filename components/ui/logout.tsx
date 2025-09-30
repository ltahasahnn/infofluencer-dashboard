'use client';
import { useRouter } from "next/navigation";
import React from 'react';

// Components
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner";

// Icons
import { LogOut } from 'lucide-react';

interface LogoutProps {
  loading: boolean;
}

export const Logout: React.FC<LogoutProps> = ({ loading }) => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem("isLogged");
      toast.success("Successfully logged out", { className: "!text-green-600" });
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Logout error:", err.message);
      } else {
        console.error("Unexpected logout error:", err);
      }
    }
  };

  return (
    loading ? (
      <SidebarMenuButton className="cursor-pointer" onClick={handleLogout}>
        <LogOut />
        <span>Logout</span>
      </SidebarMenuButton>
    ) : (
      <SidebarMenuButton className='!m-0'>
        <Skeleton className="h-4 w-full" />
      </SidebarMenuButton>
    )
  );
};
