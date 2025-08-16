"use client";

import { PortalShell } from "@/components/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Clock, Award } from "lucide-react";

function ProfessionalDevelopmentContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Professional Development</CardTitle>
          <CardDescription>Track your professional growth and training</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-[#026892]/5 rounded-lg border border-[#026892]/20"><div className="flex items-center gap-2"><Award className="h-5 w-5 text-[#026892]" /><span className="font-medium text-[#026892]">Completed Courses</span></div><p className="text-2xl font-bold text-[#026892] mt-2">12</p></div>
              <div className="p-4 bg-[#026892]/5 rounded-lg border border-[#026892]/20"><div className="flex items-center gap-2"><Clock className="h-5 w-5 text-[#026892]" /><span className="font-medium text-[#026892]">Training Hours</span></div><p className="text-2xl font-bold text-[#026892] mt-2">48</p></div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200"><div className="flex items-center gap-2"><Target className="h-5 w-5 text-orange-600" /><span className="font-medium text-orange-900">In Progress</span></div><p className="text-2xl font-bold text-orange-600 mt-2">3</p></div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Recent Activities</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg"><div><p className="font-medium">Advanced Teaching Methods</p><p className="text-sm text-gray-600">Completed • Oct 15, 2024</p></div><Badge className="bg-green-100 text-green-700">Completed</Badge></div>
                <div className="flex items-center justify-between p-3 border rounded-lg"><div><p className="font-medium">Digital Assessment Tools</p><p className="text-sm text-gray-600">In Progress • 75% complete</p></div><Badge className="bg-blue-100 text-blue-700">In Progress</Badge></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfessionalDevelopmentPage() {
  return (
    <PortalShell title="Professional Development" description="Track your professional development activities.">
      <ProfessionalDevelopmentContent />
    </PortalShell>
  );
}


