"use client"
import React, { useState, useEffect } from "react"

// Components
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

const kpiData = [
  { title: "Total Influencers", value: 3 },
  { title: "Total Followers", value: "102,400" },
  { title: "Average Engagement", value: "4.7%" },
]

const chartData = [
  { week: "Week 1", followers: 200 },
  { week: "Week 2", followers: 450 },
  { week: "Week 3", followers: 300 },
  { week: "Week 4", followers: 600 },
]

export const Chart = ({ loading }: { loading: boolean }) => {
  const [isDark, setIsDark] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const normalColor = "#6366f1"
  const hoverColor = isDark ? "#4338ca" : "#818cf8"

  return (
    !loading ?
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {kpiData.map((kpi) => (
          <div
            key={kpi.title}
            className="bg-white dark:bg-sidebar border shadow-md rounded-xl p-6 flex flex-col items-start justify-center"
          >
            <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium">{kpi.title}</h3>
            <p className="text-2xl font-bold text-black dark:text-white mt-2">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-sidebar border shadow-md rounded-xl p-6">
        <h3 className="text-black dark:text-white text-sm font-medium mb-4">Weekly Follower Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
            <XAxis dataKey="week" stroke={isDark ? "#d1d5db" : "#374151"} />
            <YAxis stroke={isDark ? "#d1d5db" : "#374151"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: "1px solid",
                borderColor: isDark ? "#374151" : "#e5e7eb",
                borderRadius: 8,
              }}
              labelStyle={{ color: isDark ? "#f9fafb" : "#111827", fontWeight: 500 }}
              itemStyle={{ color: isDark ? "#f9fafb" : "#111827" }}
            />
            <Bar
              dataKey="followers"
              radius={[6, 6, 0, 0]}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeIndex === index ? hoverColor : normalColor}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    :
    <Skeleton className='h-96 w-full !rounded-sm' />
  )
}
