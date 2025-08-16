"use client";

import { PortalShell } from "@/components/portal-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function PersonalProfileContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>Update your personal details and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/profile.webp?height=80&width=80" alt="Profile" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">Change Photo</Button>
                <p className="text-sm text-gray-600 mt-1">JPG, PNG up to 2MB</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2"><label className="text-sm font-medium">First Name</label><Input defaultValue="John" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Last Name</label><Input defaultValue="Doe" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Email</label><Input defaultValue="john.doe@university.edu" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Phone</label><Input defaultValue="+1 (555) 123-4567" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Department</label><Input defaultValue="Mathematics" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Office Location</label><Input defaultValue="Building A, Room 205" /></div>
            </div>
            <div className="flex gap-4">
              <Button className="bg-[#026892] hover:bg-[#026892]/90">Save Changes</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PersonalProfilePage() {
  return (
    <PortalShell title="Personal Profile" description="Update your personal information and preferences.">
      <PersonalProfileContent />
    </PortalShell>
  );
}


