"use client";

import { PortalShell } from "@/components/portal-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function GradeReportsContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Grade Reports</CardTitle>
          <CardDescription>Generate detailed grade analysis and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Module</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select module" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Advanced Mathematics</SelectItem>
                    <SelectItem value="stats">Statistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assessment</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select assessment" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assessments</SelectItem>
                    <SelectItem value="midterm">Midterm</SelectItem>
                    <SelectItem value="final">Final Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select format" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end"><Button className="bg-[#026892] hover:bg-[#026892]/90">Generate</Button></div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg text-center"><div className="text-2xl font-bold text-blue-600">78.5%</div><p className="text-sm text-gray-600">Class Average</p></div>
              <div className="p-4 border rounded-lg text-center"><div className="text-2xl font-bold text-green-600">92%</div><p className="text-sm text-gray-600">Pass Rate</p></div>
              <div className="p-4 border rounded-lg text-center"><div className="text-2xl font-bold text-orange-600">95%</div><p className="text-sm text-gray-600">Highest Score</p></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GradeReportsPage() {
  return (
    <PortalShell title="Grade Reports" description="Create comprehensive grade reports and summaries.">
      <GradeReportsContent />
    </PortalShell>
  );
}


