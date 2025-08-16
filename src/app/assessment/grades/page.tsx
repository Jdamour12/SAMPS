"use client";

import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarChart3, Eye, Search } from "lucide-react";

function GradesContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("current");
  // Example summary data (could be replaced with real data)
  const summary = {
    module: "Introduction to Programming",
    examTitle: "Midterm Grades",
    type: "Grades",
    totalMarks: "100",
  };
  const modules = [
    {
      code: "CS101",
      name: "Introduction to Programming",
      credits: 10,
      status: "Active",
    },
    { code: "ENG150", name: "Academic Writing", credits: 10, status: "Active" },
    { code: "MATH202", name: "Calculus II", credits: 10, status: "Active" },
    { code: "HIST101", name: "World History", credits: 10, status: "Active" },
  ];
  const filteredModules = modules.filter(
    (m) =>
      m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (module: any) => {
    window.location.href = `/assessment/moderation?module=${encodeURIComponent(
      module.code
    )}`;
  };
  const handleAnalysisClick = (module: any) => {
    window.location.href = `/assessment/analysis?module=${encodeURIComponent(
      module.code
    )}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "current" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("current")}
            className={
              activeTab === "current"
                ? "bg-[#026892] hover:bg-[#026892]/90"
                : ""
            }
          >
            Current Semester
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("upcoming")}
            className={
              activeTab === "upcoming"
                ? "bg-[#026892] hover:bg-[#026892]/90"
                : ""
            }
          >
            Upcoming
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("completed")}
            className={
              activeTab === "completed"
                ? "bg-[#026892] hover:bg-[#026892]/90"
                : ""
            }
          >
            Completed
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">All Courses</h2>
        <Card className="px-6 py-4 border-2 mx-4 border-gray-100">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredModules.map((module, index) => (
              <Card key={index} className="academic-card w-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 pb-2">
                        {module.code} - {module.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 pb-2">
                        {module.credits} Credits
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {module.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewClick(module)}
                      className="flex items-center gap-2 flex-1"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAnalysisClick(module)}
                      className="flex items-center gap-2 flex-1"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function AssessmentGradesPage() {
  return (
    <PortalShell
      title="Your Modules Grades"
      description="View and manage your enrolled courses."
    >
      <GradesContent />
    </PortalShell>
  );
}
