"use client";

import { PortalShell } from "@/components/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Calendar, MessageSquare } from "lucide-react";

function InternalCommsContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Internal Communications</CardTitle>
          <CardDescription>Stay updated with announcements and messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input placeholder="Search communications..." className="flex-1" />
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="announcements">Announcements</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">System Maintenance Notice</p>
                      <p className="text-sm text-red-700 mt-1">The academic portal will be unavailable on Saturday, Oct 21 from 2:00-6:00 AM for scheduled maintenance.</p>
                      <p className="text-xs text-red-600 mt-2">IT Department • 2 hours ago</p>
                    </div>
                  </div>
                  <Badge className="bg-red-600 text-white">Urgent</Badge>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">New Assessment Guidelines</p>
                      <p className="text-sm text-gray-600 mt-1">Updated guidelines for assessment creation and moderation are now available in the resources section.</p>
                      <p className="text-xs text-gray-500 mt-2">Academic Office • 1 day ago</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Announcement</Badge>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Department Meeting Reminder</p>
                      <p className="text-sm text-gray-600 mt-1">Monthly department meeting scheduled for Friday, Oct 25 at 2:00 PM in Conference Room B.</p>
                      <p className="text-xs text-gray-500 mt-2">Department Head • 2 days ago</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Department</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function InternalCommsPage() {
  return (
    <PortalShell title="Internal Communications" description="Access internal communications and announcements.">
      <InternalCommsContent />
    </PortalShell>
  );
}


