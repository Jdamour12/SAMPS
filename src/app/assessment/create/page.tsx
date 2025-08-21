"use client";

import { PortalShell } from "@/components/portal-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

import React, { useState } from "react";

function CreateAssessmentContent() {
  const [assessmentType, setAssessmentType] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [module, setModule] = useState("");
  const [moduleLabel, setModuleLabel] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const handleCreateAssessment = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    console.log("assessmentType:", assessmentType);
    if (assessmentType === "examination") {
      const params = new URLSearchParams({
        title: assessmentTitle,
        module: moduleLabel,
        type: assessmentType,
        totalMarks: totalMarks,
      });
      window.location.href = `/assessment/examination?${params.toString()}`;
    } else {
      window.location.href = "/assessment/moderation";
    }
  };

  return (
    <div className="space-y-3">
      <div className="mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => (window.location.href = "/assessment/moderation")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back to Moderation
        </Button>
      </div>
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Create New Assessment</CardTitle>
          <CardDescription>
            Design and configure a new assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-lg w-full">
            <div className="space-y-2">
              <label className="text-sm font-medium">Module</label>
              <Select
                value={module}
                onValueChange={(value) => {
                  setModule(value);
                  setModuleLabel(
                    value === "math"
                      ? "Advanced Mathematics"
                      : value === "stats"
                      ? "Statistics"
                      : value
                  );
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Advanced Mathematics</SelectItem>
                  <SelectItem value="stats">Statistics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Assessment Type</label>
              <Select value={assessmentType} onValueChange={setAssessmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="examination">Examination</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 col-span-1 md:col-span-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Marks</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assessment Date</label>
                <Input type="datetime-local" />
              </div>
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg resize-none"
                rows={4}
                placeholder="Enter assessment description and instructions"
              />
            </div>

            <div className="flex gap-4 justify-end pt-2 col-span-1 md:col-span-2">
              <Button
                type="button"
                className="bg-[#026892] hover:bg-[#026892]/90"
                onClick={handleCreateAssessment}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Assessment
              </Button>
              <Button variant="outline">Save as Draft</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CreateAssessmentPage() {
  return (
    <PortalShell
      title="Create Assessment"
      description="Design and create new assessments and examinations."
    >
      <CreateAssessmentContent />
    </PortalShell>
  );
}
