"use client";

import { PortalShell } from "@/components/portal-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";

const classes = ["Advanced Mathematics", "Statistics"];
const years = ["Year 1", "Year 2", "Year 3", "Year 4"];
const gradeData = [
  { grade: "A", percent: 25 },
  { grade: "B", percent: 35 },
  { grade: "C", percent: 30 },
];
const trendData = [
  { week: "W1", avg: 75 },
  { week: "W2", avg: 78 },
  { week: "W3", avg: 80 },
  { week: "W4", avg: 77 },
];
const gradeColors: Record<string, string> = {
  A: "#22c55e",
  B: "#6366f1",
  C: "#eab308",
};

function StudentPerformanceContent() {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  return (
    <div className="space-y-6">
      <Card className="academic-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#026892]">
            Student Performance Analytics
          </CardTitle>
          <CardDescription className="text-gray-700">
            Monitor and analyze student performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[200px] border-gray-300">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[140px] border-gray-300">
                <SelectValue placeholder="Year of Study" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-[#026892] text-white">Export Report</Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-lg p-4 shadow">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Performance Overview
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-600">Average Grade</span>
                    <span className="text-2xl font-bold text-green-600">
                      78.5%
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-600">Pass Rate</span>
                    <span className="text-2xl font-bold text-blue-600">
                      92%
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-600">
                      At Risk Students
                    </span>
                    <span className="text-2xl font-bold text-red-600">3</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Grade Distribution
                </h3>
                <ChartContainer
                  config={{
                    A: { color: "#22c55e" },
                    B: { color: "#6366f1" },
                    C: { color: "#eab308" },
                  }}
                >
                  <BarChart width={300} height={180} data={gradeData}>
                    <XAxis dataKey="grade" stroke="#888" fontSize={13} />
                    <YAxis stroke="#888" fontSize={13} domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percent" name="%" radius={[6, 6, 0, 0]}>
                      {gradeData.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={gradeColors[entry.grade]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Grade Trend (Monthly)
                </h3>
                <ChartContainer config={{ avg: { color: "#6366f1" } }}>
                  <BarChart width={300} height={180} data={trendData}>
                    <XAxis dataKey="week" stroke="#888" fontSize={13} />
                    <YAxis stroke="#888" fontSize={13} domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="avg"
                      name="Average"
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="rounded-lg p-4 shadow flex flex-col items-center">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  Intervention Actions
                </h3>
                <Button className="bg-yellow-500 text-white mb-2">
                  Send Alert to At Risk Students
                </Button>
                <Button className="bg-[#026892] text-white hover:bg-[#026892]/90">
                  Download Full Report
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function StudentPerformancePage() {
  return (
    <PortalShell
      title="Student Performance"
      description="Monitor and analyze student performance metrics."
    >
      <StudentPerformanceContent />
    </PortalShell>
  );
}
