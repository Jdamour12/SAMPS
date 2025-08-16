"use client";

import { PortalShell } from "@/components/portal-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, FileText } from "lucide-react";

function TeachingReportsContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Teaching Reports</CardTitle>
          <CardDescription>Generate and view teaching progress reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium">Available Reports</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent"><FileText className="mr-2 h-4 w-4" />Module Progress Report</Button>
                <Button variant="outline" className="w-full justify-start bg-transparent"><BarChart3 className="mr-2 h-4 w-4" />Student Performance Summary</Button>
                <Button variant="outline" className="w-full justify-start bg-transparent"><Clock className="mr-2 h-4 w-4" />Attendance Summary</Button>
                <Button variant="outline" className="w-full justify-start bg-transparent"><FileText className="mr-2 h-4 w-4" />Grade Distribution Report</Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Recent Reports</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Module Progress - Advanced Math</p>
                    <p className="text-sm text-gray-600">Generated 2 days ago</p>
                  </div>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Attendance Summary - Statistics</p>
                    <p className="text-sm text-gray-600">Generated 1 week ago</p>
                  </div>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReportsTeachingPage() {
  return (
    <PortalShell title="Teaching Reports" description="Generate and view teaching progress reports.">
      <TeachingReportsContent />
    </PortalShell>
  );
}


