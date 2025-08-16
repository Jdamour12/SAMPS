"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { PortalShell } from "@/components/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Download, FileText, Plus } from "lucide-react";

function CourseMaterialsContent() {
  const [activeTab, setActiveTab] = useState("lectures");
  const pathname = usePathname();
  const courseCode = pathname?.split("/").pop() || "CS101";

  const courseData = {
    CS101: {
      code: "CS101",
      name: "Introduction to Programming",
      credits: 3,
      description:
        "This course introduces students to the fundamentals of computer programming using Python. Students will learn basic programming concepts, data structures, and problem-solving techniques.",
    },
    MATH202: {
      code: "MATH202",
      name: "Calculus II",
      credits: 4,
      description:
        "Advanced calculus concepts including integration techniques, applications of integrals, and series.",
    },
    ENG150: {
      code: "ENG150",
      name: "Academic Writing",
      credits: 3,
      description:
        "Development of academic writing skills including research, analysis, and proper citation methods.",
    },
    HIST101: {
      code: "HIST101",
      name: "World History",
      credits: 3,
      description:
        "Survey of world history from ancient civilizations to modern times, focusing on major events and developments.",
    },
  } as const;

  const currentCourse = (courseData as any)[courseCode] || (courseData as any)["CS101"];

  const courseMaterials = {
    lectures: [
      {
        title: "Introduction to Python Programming",
        description: "Basic introduction to Python syntax and programming concepts",
        type: "video",
        size: "245 MB",
        duration: "1h 30m",
        icon: "video",
      },
      {
        title: "Variables and Data Types",
        description: "Comprehensive guide to Python variables and data types",
        type: "document",
        size: "2.1 MB",
        icon: "document",
      },
      {
        title: "Control Structures - Loops and Conditionals",
        description: "Understanding if statements, for loops, and while loops",
        type: "document",
        size: "189 MB",
        duration: "1h 15m",
        icon: "document",
      },
      {
        title: "Functions and Modules",
        description: "Creating and using functions, importing modules",
        type: "document",
        size: "3.2 MB",
        icon: "document",
      },
    ],
  };

  const getIcon = (type: string) => {
    if (type === "video") {
      return (
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
      );
    }
    return (
      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
        <FileText className="w-4 h-4 text-white" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900">
          <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
          Back To Courses
        </Button>
      </div>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{currentCourse.code} • {currentCourse.credits}</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{currentCourse.name}</h2>
          <Badge className="bg-green-100 text-green-700 text-sm w-fit">Active</Badge>
          <p className="text-gray-600 max-w-3xl">{currentCourse.description}</p>
        </div>
        <Button className="bg-[#026892] hover:bg-[#026892]/90">
          <Plus className="mr-2 h-4 w-4" />
          New Material
        </Button>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Course Materials</h3>
        <div className="flex gap-2 border-b border-gray-200">
          <Button variant={activeTab === "lectures" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("lectures")} className={activeTab === "lectures" ? "bg-[#026892] hover:bg-[#026892]/90" : ""}>Lectures</Button>
          <Button variant={activeTab === "readings" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("readings")} className={activeTab === "readings" ? "bg-[#026892] hover:bg-[#026892]/90" : ""}>Readings</Button>
          <Button variant={activeTab === "assessments" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("assessments")} className={activeTab === "assessments" ? "bg-[#026892] hover:bg-[#026892]/90" : ""}>Assessments</Button>
          <Button variant={activeTab === "resources" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("resources")} className={activeTab === "resources" ? "bg-[#026892] hover:bg-[#026892]/90" : ""}>Resources</Button>
        </div>
        {activeTab === "lectures" && (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Lecture Materials</h4>
            <div className="space-y-3">
              {courseMaterials.lectures.map((material, index) => (
                <Card key={index} className="academic-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getIcon(material.icon)}
                        <div>
                          <h5 className="font-medium text-gray-900">{material.title}</h5>
                          <p className="text-sm text-gray-600">{material.description}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span>Uploaded: {material.size}</span>
                            {material.duration && <span>{material.duration}</span>}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CourseMaterialsPage() {
  return (
    <PortalShell title="Course Materials" description="View and manage course materials and resources.">
      <CourseMaterialsContent />
    </PortalShell>
  );
}


