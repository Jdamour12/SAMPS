"use client";

import { PortalShell } from "@/components/portal-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function CustomReportsContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Custom Report Builder</CardTitle>
          <CardDescription>Create tailored reports for your specific needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Name</label>
                <Input placeholder="Enter report name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Sources</label>
                <div className="grid gap-2 md:grid-cols-2">
                  <label className="flex items-center space-x-2"><input type="checkbox" className="rounded" /><span className="text-sm">Student Attendance</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" className="rounded" /><span className="text-sm">Grade Records</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" className="rounded" /><span className="text-sm">Assessment Results</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" className="rounded" /><span className="text-sm">Student Demographics</span></label>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="flex gap-2"><Input type="date" /><Input type="date" /></div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Format</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select format" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="bg-[#026892] hover:bg-[#026892]/90">Generate Report</Button>
              <Button variant="outline">Save Template</Button>
              <Button variant="outline">Preview</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Saved Report Templates</CardTitle>
          <CardDescription>Quick access to your frequently used reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Monthly Performance Summary</p>
                <p className="text-sm text-gray-600">Attendance + Grades • Last used 2 days ago</p>
              </div>
              <div className="flex gap-2"><Button size="sm" variant="outline">Run</Button><Button size="sm" variant="outline">Edit</Button></div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Student Progress Report</p>
                <p className="text-sm text-gray-600">Comprehensive analysis • Last used 1 week ago</p>
              </div>
              <div className="flex gap-2"><Button size="sm" variant="outline">Run</Button><Button size="sm" variant="outline">Edit</Button></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CustomReportsPage() {
  return (
    <PortalShell title="Custom Reports" description="Build custom reports tailored to your specific needs.">
      <CustomReportsContent />
    </PortalShell>
  );
}


