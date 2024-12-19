"use client"

import React, { useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, AreaChart, Area } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Toggle } from "@/components/ui/toggle"

function BarChartDashboard({ budgetList }) {
  const [isBarChart, setIsBarChart] = useState(true)

  // Updated colors as requested
  const chartConfig = {
    totalSpend: {
      label: "Total Spend",
      color: "#4845d2",
    },
    amount: {
      label: "Amount",
      color: "#02ae5b",
    },
  }

  return (
    <div className='border rounded-lg p-5'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg p-2'>Activity</h2>
        <Toggle pressed={!isBarChart} onPressedChange={(pressed) => setIsBarChart(!pressed)}>
          {isBarChart ? "Bar Chart" : "Area Chart"}
        </Toggle>
      </div>

      <ChartContainer config={chartConfig}>
        {isBarChart ? (
          <BarChart
            accessibilityLayer
            width={500}
            height={300}
            data={budgetList}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="totalSpend" fill="#4845d2" radius={4} />
            <Bar dataKey="amount" fill="#02ae5b" radius={4} />
          </BarChart>
        ) : (
          <AreaChart
            accessibilityLayer
            width={500}
            height={300}
            data={budgetList}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="totalSpend"
              type="monotone"
              fill="#4845d2"
              fillOpacity={0.4}
              stroke="#4845d2"
              stackId="a"
            />
            <Area
              dataKey="amount"
              type="monotone"
              fill="#02ae5b"
              fillOpacity={0.4}
              stroke="#02ae5b"
              stackId="a"
            />
          </AreaChart>
        )}
      </ChartContainer>
    </div>
  )
}

export default BarChartDashboard
