"use client";

import { PortalShell } from "@/components/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

function LeaveManagementContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Leave Management</h2>
          <p className="text-gray-600">Apply for and track your leave requests</p>
        </div>
        <Button className="bg-[#026892] hover:bg-[#026892]/90"><Calendar className="mr-2 h-4 w-4" />Apply for Leave</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="academic-card">
          <CardHeader>
            <CardTitle className="text-lg">Leave Balance</CardTitle>
            <CardDescription>Your current leave entitlements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm">Annual Leave</span><span className="font-medium">18 days</span></div>
              <div className="flex justify-between"><span className="text-sm">Sick Leave</span><span className="font-medium">12 days</span></div>
              <div className="flex justify-between"><span className="text-sm">Personal Leave</span><span className="font-medium">5 days</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader>
            <CardTitle className="text-lg">Recent Requests</CardTitle>
            <CardDescription>Your latest leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Annual Leave</p>
                    <p className="text-sm text-gray-600">Dec 20-30, 2024</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">Pending</Badge>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Sick Leave</p>
                    <p className="text-sm text-gray-600">Oct 15, 2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Approved</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LeaveManagementPage() {
  return (
    <PortalShell title="Leave Management" description="Apply for and manage your leave requests.">
      <LeaveManagementContent />
    </PortalShell>
  );
}


