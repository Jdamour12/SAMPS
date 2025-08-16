"use client";

import { PortalShell } from "@/components/portal-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

function GroupManagementContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Group Management</h2>
          <p className="text-gray-600">Create and manage student groups</p>
        </div>
        <Button className="bg-[#026892] hover:bg-[#026892]/90"><Users className="mr-2 h-4 w-4" />Create Group</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="academic-card">
          <CardHeader>
            <CardTitle className="text-lg">Project Group A</CardTitle>
            <CardDescription>Advanced Mathematics • 5 members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2"><Avatar className="h-6 w-6"><AvatarFallback className="text-xs">JD</AvatarFallback></Avatar><span className="text-sm">John Doe (Leader)</span></div>
              <div className="flex items-center gap-2"><Avatar className="h-6 w-6"><AvatarFallback className="text-xs">JS</AvatarFallback></Avatar><span className="text-sm">Jane Smith</span></div>
              <div className="text-sm text-gray-600">+3 more members</div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">Manage Group</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader>
            <CardTitle className="text-lg">Study Group Beta</CardTitle>
            <CardDescription>Statistics • 4 members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2"><Avatar className="h-6 w-6"><AvatarFallback className="text-xs">AB</AvatarFallback></Avatar><span className="text-sm">Alice Brown (Leader)</span></div>
              <div className="flex items-center gap-2"><Avatar className="h-6 w-6"><AvatarFallback className="text-xs">CD</AvatarFallback></Avatar><span className="text-sm">Charlie Davis</span></div>
              <div className="text-sm text-gray-600">+2 more members</div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">Manage Group</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function GroupManagementPage() {
  return (
    <PortalShell title="Group Management" description="Create and manage student groups for projects and activities.">
      <GroupManagementContent />
    </PortalShell>
  );
}


