"use client";

import { PortalShell } from "@/components/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

function StudentAbsencesContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Absence Tracking</CardTitle>
          <CardDescription>Monitor and manage student absences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-600" /><span className="font-medium text-red-900">High Absence Rate</span></div>
                <p className="text-2xl font-bold text-red-600 mt-2">5 Students</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-orange-600" /><span className="font-medium text-orange-900">Recent Absences</span></div>
                <p className="text-2xl font-bold text-orange-600 mt-2">12 Today</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-600" /><span className="font-medium text-green-900">Perfect Attendance</span></div>
                <p className="text-2xl font-bold text-green-600 mt-2">28 Students</p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Student Name</th>
                    <th className="text-left p-3 font-medium">Total Absences</th>
                    <th className="text-left p-3 font-medium">Last Absence</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">John Doe</td>
                    <td className="p-3">8</td>
                    <td className="p-3">Oct 18, 2024</td>
                    <td className="p-3"><Badge className="bg-red-100 text-red-700">At Risk</Badge></td>
                    <td className="p-3"><Button size="sm" variant="outline">Contact</Button></td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Jane Smith</td>
                    <td className="p-3">3</td>
                    <td className="p-3">Oct 15, 2024</td>
                    <td className="p-3"><Badge className="bg-green-100 text-green-700">Good</Badge></td>
                    <td className="p-3"><Button size="sm" variant="outline">View</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function StudentAbsencesPage() {
  return (
    <PortalShell title="Student Absences" description="Track and manage student absences and attendance issues.">
      <StudentAbsencesContent />
    </PortalShell>
  );
}


