"use client";

import React from "react";
import { PortalShell } from "@/components/portal-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  CheckCircle,
  ClipboardCheck,
  Clock,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const performanceData = [
  { module: "Advanced Math", score: 85, attendance: 92 },
  { module: "Statistics", score: 78, attendance: 88 },
  { module: "Programming", score: 91, attendance: 95 },
  { module: "Networks", score: 74, attendance: 80 },
  { module: "Database", score: 88, attendance: 90 },
];

function getDashboardWidgets(role: string) {
  const baseWidgets = [
    {
      title: "Quick Actions",
      content: (
        <div className="space-y-3">
          <Link href="/teaching/attendance">
            <Button
              className="w-full justify-start bg-blue-100 text-blue-800 mb-2 hover:bg-blue-200 h-12"
              variant="outline"
              size="sm"
            >
              <Clock className="mr-2 h-4 w-4" />
              Record Attendance
            </Button>
          </Link>
          <Link href="/assessment/grades">
            <Button
              className="w-full justify-start bg-blue-100 text-blue-800 mb-2 hover:bg-blue-200 h-12"
              variant="outline"
              size="sm"
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Grades
            </Button>
          </Link>
          <Link href="/reports/teaching">
            <Button
              className="w-full justify-start bg-orange-100 text-orange-700 hover:bg-orange-100 border-none h-12"
              variant="outline"
              size="sm"
            >
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const roleSpecificWidgets: Record<
    string,
    Array<{ title: string; content: React.ReactNode }>
  > = {
    lecturer: [
      {
        title: "Today's Schedule",
        content: (
          <div className="space-y-4">
            <Link href="/teaching/timetable">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 cursor-pointer">
                <div>
                  <p className="font-medium text-blue-900">
                    Advanced Mathematics
                  </p>
                  <p className="text-sm text-blue-600">
                    Room 101 • 09:00-11:00
                  </p>
                </div>
                <Badge className="bg-[#026892] text-white">Next</Badge>
              </div>
            </Link>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Statistics</p>
                <p className="text-sm text-gray-600">Room 205 • 14:00-16:00</p>
              </div>
              <Badge
                variant="outline"
                className="border-gray-300 text-gray-600"
              >
                Later
              </Badge>
            </div>
          </div>
        ),
      },
      {
        title: "Class Performance",
        content: (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Average Attendance
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="font-medium text-green-600">87%</span>
              </div>
            </div>
            <Link href="/assessment/grades">
              <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 pt-3 rounded">
                <span className="text-sm font-medium text-gray-700">
                  Pending Grades
                </span>
                <Badge className="bg-red-100 text-red-700 border-red-200">
                  12
                </Badge>
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Student Alerts
              </span>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                3
              </Badge>
            </div>
          </div>
        ),
      },
    ],
  };

  return [...baseWidgets, ...(roleSpecificWidgets[role] || [])];
}

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const moduleOptions = [
  "Advanced Math",
  "Statistics",
  "Programming",
  "Networks",
  "Database",
];

function DashboardContent({ role }: { role: string }) {
  const [selectedModule, setSelectedModule] = React.useState<string>(
    moduleOptions[0]
  );
  const dashboardWidgets = getDashboardWidgets(role);
  const filteredPerformanceData = performanceData.filter(
    (d) => d.module === selectedModule
  );

  return (
    <>
      {/* Quick Actions and Module Dropdown aligned horizontally */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          {/* ...existing code for Quick Actions... */}
        </div>
        <div className="flex items-center gap-5 min-w-[260px]">
          <label className="text-sm font-medium font-bold text-gray-900 hover:cursor-pointer" htmlFor="module">
            Module
          </label>
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger className="w-[287px]" id="module">
              <SelectValue placeholder="Select a module" />
            </SelectTrigger>
            <SelectContent>
              {moduleOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="academic-card border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Active Students
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,234</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last semester
            </p>
          </CardContent>
        </Card>

        <Card className="academic-card border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Attendance Rate
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87.5%</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +2.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="academic-card border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Pending Tasks
            </CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <p className="text-xs text-orange-600 mt-1">5 high priority</p>
          </CardContent>
        </Card>

        <Card className="academic-card border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Completion Rate
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94.2%</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardWidgets.map((widget, index) => (
          <Card key={index} className="academic-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent>{widget.content}</CardContent>
          </Card>
        ))}
      
      </div>

      <div className="flex gap-4  lg:grid-cols-2">
        <Card
          className="academic-card md:col-span-2 flex flex-row items-start justify-start"
          style={{ width: "400px", minWidth: 0, padding: 0 }}
        >
          <div className="flex flex-col w-full items-start">
            <div className="flex flex-col justify-start items-start pl-8 pt-2 w-full">
              <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                Performance Analytics
              </CardTitle>
              <CardDescription className="text-gray-600">
                Score vs Attendance for {selectedModule}
              </CardDescription>
            </div>
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: 260, height: 260 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart className="mx-16">
                  <Pie
                    data={
                      filteredPerformanceData.length
                        ? [
                            {
                              name: "Score",
                              value: filteredPerformanceData[0].score,
                            },
                            {
                              name: "Attendance",
                              value: filteredPerformanceData[0].attendance,
                            },
                          ]
                        : [
                            { name: "Score", value: 70 },
                            { name: "Attendance", value: 85 },
                          ]
                    }
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={55}
                    label={true}
                  >
                    <Cell key="score" fill="#026892" />
                    <Cell key="attendance" fill="#22c55e" />
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    height={10}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
          </div>
        </Card>

        <Card className="academic-card w-[800px] ">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">
                  Grade submission completed
                </p>
                <p className="text-sm text-blue-600">
                  Advanced Mathematics - 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-green-900">
                  Teaching plan approved
                </p>
                <p className="text-sm text-green-600">
                  Statistics Module - 4 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <Activity className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-orange-900">
                  New student inquiry
                </p>
                <p className="text-sm text-orange-600">
                  Course enrollment question - 6 hours ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      
    </>
  );
}

export default function DashboardPage() {
  return (
    <PortalShell
      title="Lecturer Dashboard"
      description="Welcome back! Here's what's happening in your academic environment."
    >
      <DashboardContent role="lecturer" />
    </PortalShell>
  );
}
