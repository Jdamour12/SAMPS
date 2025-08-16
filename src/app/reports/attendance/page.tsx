"use client";

import { PortalShell } from "@/components/portal-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function AttendanceReportsContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Attendance Reports</CardTitle>
          <CardDescription>Generate comprehensive attendance analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Module</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select module" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="math">Advanced Mathematics</SelectItem>
                    <SelectItem value="stats">Statistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select period" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="semester">This Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="trends">Trends</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-[#026892] hover:bg-[#026892]/90">Generate Report</Button>
              <Button variant="outline">Schedule Report</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3">Overall Attendance Rate</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">87.5%</div>
                <p className="text-sm text-gray-600">+2.1% from last month</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3">Students at Risk</h3>
                <div className="text-3xl font-bold text-red-600 mb-2">5</div>
                <p className="text-sm text-gray-600">Below 75% attendance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AttendanceReportsPage() {
  return (
    <PortalShell title="Attendance Reports" description="Generate detailed attendance reports and analytics.">
      <AttendanceReportsContent />
    </PortalShell>
  );
}


