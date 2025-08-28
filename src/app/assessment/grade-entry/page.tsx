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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Search } from "lucide-react";

import React, { useState } from "react";

function GradeEntryContent() {
  const [published, setPublished] = React.useState(false);
  // Get query params for summary card
  let module = "";
  let assessmentName = "";
  let type = "";
  let totalMarks = "";
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    module = params.get("module") || "";
    assessmentName = params.get("assessment") || "";
    type = params.get("type") || "";
    totalMarks = params.get("totalMarks") || "";
  }

  const handleBackToModeration = () => {
    window.location.href = "/assessment/moderation";
  };

  // Example students and initial grades
  const students = [
    { no: "001", id: "STU001", grade: "85" },
    { no: "002", id: "STU002", grade: "92" },
    { no: "003", id: "STU003", grade: "78" },
    { no: "004", id: "STU004", grade: "88" },
    { no: "005", id: "STU005", grade: "90" },
  ];
  const [grades, setGrades] = React.useState(students.map((s) => s.grade));
  const [changed, setChanged] = React.useState<number[]>([]);
  const [search, setSearch] = React.useState("");

  const handleGradeChange = (idx: number, value: string) => {
    setGrades((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
    setChanged((prev) => {
      if (students[idx].grade !== value) {
        if (!prev.includes(idx)) return [...prev, idx];
      } else {
        return prev.filter((i) => i !== idx);
      }
      return prev;
    });
  };

  // Filter students by search
  const filtered = students
    .map((student, idx) => ({ ...student, idx }))
    .filter(
      (student) =>
        student.no.toLowerCase().includes(search.toLowerCase()) ||
        student.id.toLowerCase().includes(search.toLowerCase())
    );

  // Pagination logic
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedStudents = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToModeration}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
          Back to Grade Moderation
        </Button>
      </div>
      <Card className="mb-2 shadow-sm border border-gray-200">
        <CardContent className="flex flex-wrap gap-6 py-4 px-6 items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">Course</div>
            <div className="font-semibold text-base text-[#026892]">
              {module || "-"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Assessment Name</div>
            <div className="font-semibold text-base">
              {assessmentName || "-"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Type</div>
            <div className="font-semibold text-base">
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : "-"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Max Marks</div>
            <div className="font-semibold text-base">{totalMarks || "-"}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="academic-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Grade Entry</CardTitle>
              <CardDescription>
                Enter and manage student grades and assessments
              </CardDescription>
            </div>
            {published && (
              <Badge className="bg-green-100 text-green-700 ml-4">
                Published
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Search by name or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button className="bg-[#026892] hover:bg-[#026892]/90">
                  Save Grades{changed.length > 0 ? ` (${changed.length})` : ""}
                </Button>
                {!published && (
                  <Button
                    className="bg-[#026892] hover:bg-[#026892]/90"
                    onClick={() => setPublished(true)}
                  >
                    Publish Marks
                  </Button>
                )}
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-bold">NO</th>
                    <th className="text-left p-3 font-bold">Student ID</th>
                    <th className="text-left p-3 font-bold">Grade</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {paginatedStudents.map((student) => (
                    <tr className="border-t" key={student.id}>
                      <td className="p-3">{student.no}</td>
                      <td className="p-3 font-bold text-sm">{student.id}</td>
                      <td className="p-3">
                        <Input
                          className="w-20"
                          placeholder={student.grade}
                          value={grades[student.idx]}
                          onChange={(e) =>
                            handleGradeChange(student.idx, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useSearchParams } from "next/navigation";

export default function GradeEntryPage() {
  let moduleCode = null;
  let assessmentName = null;
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    moduleCode = params.get("module");
    assessmentName = params.get("assessment");
  }
  const pageTitle = assessmentName ? assessmentName : "Grade Entry";
  const moduleDesc = moduleCode
    ? `Enter and manage grades for your students`
    : "Enter and manage student grades and assessments.";
  return (
    <PortalShell title={pageTitle} description={moduleDesc}>
      <GradeEntryContent />
    </PortalShell>
  );
}
