"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PortalShell } from "@/components/portal-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

// Dummy students data
const students = [
  { no: "001", reg: "222005824", status: "Present", absenceType: "" },
  {
    no: "002",
    reg: "222007252",
    status: "Absent",
    absenceType: "With Permission",
  },
  {
    no: "003",
    reg: "321013529",
    status: "Absent",
    absenceType: "Without Permission",
  },
  { no: "004", reg: "222017795", status: "Present", absenceType: "" },
  {
    no: "005",
    reg: "222017468",
    status: "Absent",
    absenceType: "With Permission",
  },
  { no: "006", reg: "222004841", status: "Present", absenceType: "" },
  { no: "007", reg: "222013628", status: "Present", absenceType: "" },
  {
    no: "008",
    reg: "222018030",
    status: "Absent",
    absenceType: "Without Permission",
  },
  { no: "009", reg: "222009408", status: "Present", absenceType: "" },
  {
    no: "010",
    reg: "222009765",
    status: "Absent",
    absenceType: "With Permission",
  },
];

function AttendanceRecordContent() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionName = params.get("session") || "Session";

  // Example statistics
  // Find percent for the selected session (simulate with first student for demo)
  const sessionPercent = 93; // Replace with actual percent if available from session data
  const stats = [
    {
      label: "Total Students",
      value: students.length,
      sub: "All enrolled for this session",
      color: "bg-[#026892] text-white",
    },
    {
      label: "Present",
      value: students.filter((s) => s.status === "Present").length,
      sub: `Marked present by device • Avg Attendance: ${sessionPercent}%`,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Absent",
      value: students.filter((s) => s.status === "Absent").length,
      sub: "Not recorded by device",
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Absent With Permission",
      value: students.filter(
        (s) => s.status === "Absent" && s.absenceType === "With Permission"
      ).length,
      sub: "Excused absences",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  // Search and pagination state
  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 5;

  const filteredStudents = students.filter(
    (s) =>
      s.no.toLowerCase().includes(search.toLowerCase()) ||
      s.reg.includes(search)
  );

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <PortalShell
      title={sessionName}
      description="Attendance record and statistics for this session."
    >
      <div className="w-full px-4 md:px-8 space-y-6">
        {/* Back Button */}
        <div className="mb-2 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/teaching/attendance")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
            Back to Sessions
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className={`rounded-xl shadow-lg p-6 flex flex-col items-center justify-center h-40 ${stat.color}`}
            >
              <div className="text-lg font-bold tracking-wide mb-1">
                {stat.label}
              </div>
              <div
                className="text-4xl font-extrabold mb-2"
                style={{
                  color: stat.label === "Total Students" ? "#fff" : undefined,
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm font-medium opacity-80 text-center"
                style={{
                  color:
                    stat.label === "Total Students" ? "#e0e7ef" : undefined,
                }}
              >
                {stat.sub}
              </div>
            </Card>
          ))}
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Attendance</CardTitle>
            <CardDescription>
              See who attended, was absent, or had permission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <Input
                className="w-96"
                placeholder="Search by reg number..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium">NO</th>
                    <th className="text-left p-3 font-medium">Reg Number</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Absence Type</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((s, i) => (
                    <tr key={i} className="border-t text-gray-700">
                      <td className="p-3 whitespace-nowrap text-gray-600">
                        {s.no}
                      </td>
                      <td className="p-3 whitespace-nowrap font-bold text-gray-800">
                        {s.reg}
                      </td>
                      <td className="p-3 whitespace-nowrap text-gray-600">
                        <Badge
                          className={
                            s.status === "Present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {s.status === "Present" ? "Present" : "Absent"}
                        </Badge>
                      </td>
                      <td className="p-3 whitespace-nowrap text-gray-600">
                        {s.status === "Absent" ? s.absenceType : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center mt-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-xs">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}

// Wrap content in Suspense
export default function AttendanceRecordPage() {
  return (
    <Suspense fallback={<div>Loading attendance...</div>}>
      <AttendanceRecordContent />
    </Suspense>
  );
}
