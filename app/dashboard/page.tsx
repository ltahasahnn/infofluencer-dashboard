"use client";
import { useEffect, useState } from "react";

// Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Chart } from "@/components/ui/chart";

// Layouts
import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    setLoading(false)
  },[])

  return (
    <DashboardLayout>
      <Breadcrumb>
         <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              {!loading ? 'Dashboard' : <Skeleton className='h-5 w-24 !rounded-sm' />}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Chart loading={loading} />
    </DashboardLayout>
  );
}
