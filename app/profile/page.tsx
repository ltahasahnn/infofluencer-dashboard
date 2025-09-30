"use client";
import { useEffect, useState } from "react";

// Layouts
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Profile } from "@/components/ui/profile";

export default function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    setLoading(false)
  },[])

  return (
    <DashboardLayout>
      <Profile loading={loading} />
    </DashboardLayout>
  );
}
