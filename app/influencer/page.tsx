"use client";
import { useEffect, useState } from "react";

// Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { InfluencerTable } from "@/components/ui/influencer";
import { Skeleton } from "@/components/ui/skeleton";

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
            <BreadcrumbLink href="/influencer">
              {!loading ? 'Influencer' : <Skeleton className='h-5 w-24 !rounded-sm' />}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <InfluencerTable loading={loading} />
    </DashboardLayout>
  );
}
