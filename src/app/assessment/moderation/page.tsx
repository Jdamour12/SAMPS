"use client";

import React, { useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function AssessmentModerationContent() {
  const handleCreateAssessment = () => {
    window.location.href = "/assessment/create";
  };
  const handleBackToGrades = () => {
    window.location.href = "/assessment/grades";
  };

  // Example moderation data
  const initialRows = [
    {
      assessment: "Midterm Exam",
      module: "Advanced Mathematics",
      type: "Exam",
      status: "Pending Approval",
      statusClass: "bg-orange-100 text-orange-700 hover:bg-orange-200",
      action: "Review",
    },
    {
      assessment: "Assignment 2",
      module: "Statistics",
      type: "Assignment",
      status: "Published",
      statusClass: "bg-green-100 text-green-700 hover:bg-green-200",
      action: "View",
    },
    {
      assessment: "Final Exam",
      module: "Advanced Mathematics",
      type: "Exam",
      status: "Unpublished",
      statusClass: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      action: "Review",
    },
    {
      assessment: "Quiz 1",
      module: "Statistics",
      type: "Quiz",
      status: "Approved",
      statusClass: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      action: "View",
    },
    {
      assessment: "Assignment 1",
      module: "Advanced Mathematics",
      type: "Project",
      status: "Rejected",
      statusClass: "bg-red-100 text-red-700 hover:bg-red-200",
      action: "View",
    },
    {
      assessment: "Lab Report",
      module: "Physics",
      type: "Lab",
      status: "Published",
      statusClass: "bg-green-100 text-green-700 hover:bg-green-200",
      action: "View",
    },
    {
      assessment: "Essay",
      module: "English",
      type: "Essay",
      status: "Unpublished",
      statusClass: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      action: "Review",
    },
  ];
  const [moderationRows, setModerationRows] = useState(initialRows);
  const [search, setSearch] = useState("");
  const [cancelIdx, setCancelIdx] = useState<number | null>(null);
  const filteredRows = moderationRows.filter(
    (row) =>
      row.assessment.toLowerCase().includes(search.toLowerCase()) ||
      row.module.toLowerCase().includes(search.toLowerCase()) ||
      row.status.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleCancel = (idx: number) => {
    setCancelIdx(idx);
  };
  const confirmCancel = () => {
    if (cancelIdx === null) return;
    setModerationRows((rows) =>
      rows.map((row, i) =>
        i === cancelIdx
          ? {
              ...row,
              status: "Canceled",
              statusClass: "bg-gray-300 text-gray-700",
              action: "-",
            }
          : row
      )
    );
    setCancelIdx(null);
  };
  const cancelDialog =
    cancelIdx !== null ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <div className="mb-4 font-semibold text-lg">Cancel Assessment</div>
          <div className="mb-4 text-gray-700">
            Are you sure you want to cancel this assessment? This action cannot
            be undone.
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setCancelIdx(null)}>
              No, keep
            </Button>
            <Button className="bg-[#026892]" onClick={confirmCancel}>
              Yes, cancel
            </Button>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      {cancelDialog}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToGrades}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
          Back to Grades
        </Button>
      </div>
      <Card className="academic-card">
        <CardHeader>
          <div>
            <CardTitle className="text-lg">Assessment Moderation</CardTitle>
            <CardDescription>
              Review and moderate assessment materials
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Search by assessment, module, or status..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                onClick={handleCreateAssessment}
                className="bg-[#026892] hover:bg-[#026892]/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Assessment
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Assessment</th>
                    <th className="text-left p-3 font-medium">Module</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {paginatedRows.map((row, idx) => (
                    <tr
                      className="border-t"
                      key={idx + (page - 1) * rowsPerPage}
                    >
                      <td className="p-3">{row.assessment}</td>
                      <td className="p-3">{row.module}</td>
                      <td className="p-3">{row.type}</td>
                      <td className="p-3">
                        <Badge className={row.statusClass}>{row.status}</Badge>
                      </td>
                      <td className="p-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={row.status === "Canceled"}
                          onClick={() => {
                            const url = `/assessment/grade-entry?module=${encodeURIComponent(
                              row.module
                            )}&assessment=${encodeURIComponent(
                              row.assessment
                            )}`;
                            window.location.href = url;
                          }}
                        >
                          {row.action}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={row.status === "Canceled"}
                          onClick={() =>
                            handleCancel(idx + (page - 1) * rowsPerPage)
                          }
                        >
                          Cancel
                        </Button>
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

export default function AssessmentModerationPage() {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const moduleCode = searchParams ? searchParams.get("module") : null;
  const moduleTitle = moduleCode
    ? `Assessment Moderation - ${moduleCode}`
    : "Assessment Moderation";
  const moduleDesc = moduleCode
    ? `Review and moderate assessment materials for module: ${moduleCode}`
    : "Review and moderate assessment materials and grades.";
  return (
    <PortalShell title={moduleTitle} description={moduleDesc}>
      <AssessmentModerationContent />
    </PortalShell>
  );
}
