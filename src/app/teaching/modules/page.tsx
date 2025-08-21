"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Users2 } from "lucide-react";

function ModulesContent() {
  const [activeTab, setActiveTab] = useState("current");
  const [searchTerm, setSearchTerm] = useState("");
  const modules = [
    {
      code: "CS101",
      name: "Introduction to Programming",
      credits: 10,
      status: "Active",
    },
    { code: "MATH202", name: "Calculus II", credits: 10, status: "Active" },
    { code: "ENG150", name: "Academic Writing", credits: 10, status: "Active" },
    { code: "HIST101", name: "World History", credits: 10, status: "Active" },
  ];
  const filteredModules = modules.filter(
    (m) =>
      m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
          >
            Upcoming
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Assigned Courses
        </h2>
        <Card
          style={{ background: "transparent", boxShadow: "none" }}
          className="p-4 border-none"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {filteredModules.map((module, index) => (
              <Card key={index} className="academic-card w-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {module.code} - {module.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
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
                      className="flex items-center gap-2 flex-1"
                      onClick={() =>
                        (window.location.href = `/teaching/materials/${encodeURIComponent(
                          module.code
                        )}`)
                      }
                    >
                      <BookOpen className="h-4 w-4" />
                      Materials
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 flex-1"
                    >
                      <FileText className="h-4 w-4" />
                      Assignments
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 flex-1"
                    >
                      <Users2 className="h-4 w-4" />
                      Forum
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
  // ...existing code...
}

export default function TeachingModulesPage() {
  return (
    <PortalShell
      title="My Modules"
      description="Manage your teaching modules and course content."
    >
      <ModulesContent />
    </PortalShell>
  );
}
