"use client";

import { PortalShell } from "@/components/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AssessmentCalendarContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Assessment Calendar</CardTitle>
          <CardDescription>
            View and manage your assessment schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 justify-between items-center">
              <Select defaultValue="october">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="october">October 2024</SelectItem>
                  <SelectItem value="november">November 2024</SelectItem>
                  <SelectItem value="december">December 2024</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1" />
              <Button className="bg-[#026892] hover:bg-[#026892]/90">Add Assessment</Button>
            </div>

            <div className="grid gap-4">
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-blue-900">
                      Midterm Examination
                    </h3>
                    <p className="text-sm text-blue-700">
                      Advanced Mathematics
                    </p>
                    <p className="text-sm text-blue-600">
                      October 25, 2024 • 09:00-12:00
                    </p>
                  </div>
                  <Badge className="bg-[#026892] text-white">Upcoming</Badge>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-green-900">
                      Assignment 3 Due
                    </h3>
                    <p className="text-sm text-green-700">Statistics</p>
                    <p className="text-sm text-green-600">
                      October 30, 2024 • 23:59
                    </p>
                  </div>
                  <Badge className="bg-green-600 text-white">Assignment</Badge>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-orange-900">
                      Final Project Presentation
                    </h3>
                    <p className="text-sm text-orange-700">
                      Advanced Mathematics
                    </p>
                    <p className="text-sm text-orange-600">
                      November 15, 2024 • 14:00-17:00
                    </p>
                  </div>
                  <Badge className="bg-orange-600 text-white">Project</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AssessmentCalendarPage() {
  return (
    <PortalShell
      title="Assessment Calendar"
      description="View and manage your assessment schedule and deadlines."
    >
      <AssessmentCalendarContent />
    </PortalShell>
  );
}
