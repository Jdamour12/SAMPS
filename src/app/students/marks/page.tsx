"use client";

import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const semesters = ["2024 Semester 1", "2024 Semester 2", "2025 Semester 1"];
const modules = ["Java", "Python", "Mathematics", "Physics"];
const years = ["Year 1", "Year 2", "Year 3", "Year 4"];

const students = [
  { sn: 1, reg: "222005824", gender: "F" },
  { sn: 2, reg: "222007252", gender: "M" },
  { sn: 3, reg: "321013529", gender: "M" },
  { sn: 4, reg: "222017795", gender: "F" },
  { sn: 5, reg: "222017468", gender: "M" },
  { sn: 6, reg: "222004841", gender: "M" },
  { sn: 7, reg: "222013628", gender: "F" },
  { sn: 8, reg: "222018030", gender: "M" },
  { sn: 9, reg: "222009408", gender: "M" },
  { sn: 10, reg: "222009765", gender: "F" },
  { sn: 11, reg: "222008333", gender: "M" },
  { sn: 12, reg: "222003168", gender: "M" },
];

export default function StudentMarksPage() {
  const [semester, setSemester] = useState(semesters[0]);
  const [module, setModule] = useState(modules[0]);
  const [search, setSearch] = useState("");
  const [published, setPublished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Example marks state (static, not editable here)
  const marks = students.map(() => ({
    cat1: "",
    cat2: "",
    testAvg: "",
    quiz1: "",
    quiz2: "",
    quizAvg: "",
    a1: "",
    a2: "",
    assignAvg: "",
    l1: "",
    l2: "",
    l3: "",
    labAvg: "",
    exam: "",
    total: "0.00",
    remark: "FAIL",
  }));

  // Filtering logic
  const filteredStudents = students.filter(
    (s) =>
      s.reg.toLowerCase().includes(search.toLowerCase()) ||
      s.sn.toString().includes(search)
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Table columns
  const columns = [
    { label: "SN", key: "sn" },
    { label: "REG. NUMBER", key: "reg" },
    { label: "GENDER", key: "gender" },
    { label: "CAT1", key: "cat1" },
    { label: "CAT2", key: "cat2" },
    { label: "Average", key: "testAvg" },
    { label: "Quiz1", key: "quiz1" },
    { label: "Quiz2", key: "quiz2" },
    { label: "Average", key: "quizAvg" },
    { label: "A1", key: "a1" },
    { label: "A2", key: "a2" },
    { label: "Average", key: "assignAvg" },
    { label: "L1", key: "l1" },
    { label: "L2", key: "l2" },
    { label: "L3", key: "l3" },
    { label: "Average", key: "labAvg" },
    { label: "Exam", key: "exam" },
    { label: "Total Marks (100)", key: "total" },
    { label: "REMARK", key: "remark" },
  ];

  // Status badges
  const statusBadges = (
    <div className="flex gap-2 mb-2">
      {published && (
        <Badge className="bg-green-100 text-green-700">
          Published to Students
        </Badge>
      )}
      {submitted && (
        <Badge className="bg-blue-100 text-blue-700">Submitted to HOD</Badge>
      )}
    </div>
  );

  return (
    <PortalShell title="Students Marks" description="View your student marks.">
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-3 py-2"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            {semesters.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={module}
            onChange={(e) => setModule(e.target.value)}
          >
            {modules.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select className="border rounded px-3 py-2" defaultValue={years[0]}>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            className="bg-[#026892] hover:bg-[#026892]/90"
            onClick={() => setPublished(true)}
            disabled={published}
          >
            Publish to Students
          </Button>
          <Button
            className="bg-[#026892] hover:bg-[#026892]/90"
            onClick={() => setSubmitted(true)}
            disabled={submitted}
          >
            Submit to HOD
          </Button>
          <Button
            variant="outline"
            className="hover:bg-[#026892]/30 hover:text-white"
          >
            Export
          </Button>
        </div>
      </div>
      {statusBadges}
      <Card className="overflow-x-auto">
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <Input
              className="w-96 mt-4"
              placeholder="Search marks by student ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <table
            className="w-full text-sm border rounded-lg"
            style={{ borderCollapse: "separate", borderSpacing: 0 }}
          >
            <thead>
              <tr>
                <th
                  rowSpan={2}
                  className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-gray-700"
                >
                  SN
                </th>
                <th
                  rowSpan={2}
                  className="bg-[#d2f0d2] border p-2 text-xs font-semibold text-gray-700"
                >
                  REG. NUMBER
                </th>
                <th
                  rowSpan={2}
                  className="bg-[#d2f0d2] border p-2 text-xs font-semibold text-gray-700"
                >
                  GENDER
                </th>
                <th
                  colSpan={3}
                  className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-center text-gray-700"
                >
                  TESTS
                </th>
                <th
                  colSpan={3}
                  className="bg-[#d2eaf6] border p-2 text-xs font-semibold text-center text-gray-700"
                >
                  Quiz
                </th>
                <th
                  colSpan={3}
                  className="bg-[#f6f2d2] border p-2 text-xs font-semibold text-center text-gray-700"
                >
                  Assignments
                </th>
                <th
                  colSpan={4}
                  className="bg-[#f6eae2] border p-2 text-xs font-semibold text-center text-gray-700"
                >
                  Laboratory practice
                </th>
                <th
                  rowSpan={2}
                  className="bg-[#e2eaf6] border p-2 text-xs font-semibold text-gray-700"
                >
                  Exam
                </th>
                <th
                  rowSpan={2}
                  className="bg-[#f6d2d2] border p-2 text-xs font-semibold text-gray-700"
                >
                  Total Marks (50%)
                </th>
                <th
                  rowSpan={2}
                  className="bg-[#f6d2d2] border p-2 text-xs font-semibold text-gray-700"
                >
                  REMARK
                </th>
              </tr>
              <tr>
                <th className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-gray-700">
                  CAT1
                </th>
                <th className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-gray-700">
                  CAT2
                </th>
                <th className="bg-[#eaf6ea] border p-2 text-xs font-semibold text-gray-700">
                  Average
                </th>
                <th className="bg-[#d2eaf6] border p-2 text-xs font-semibold text-gray-700">
                  Quiz1
                </th>
                <th className="bg-[#d2eaf6] border p-2 text-xs font-semibold text-gray-700">
                  Quiz2
                </th>
                <th className="bg-[#d2eaf6] border p-2 text-xs font-semibold text-gray-700">
                  Average
                </th>
                <th className="bg-[#f6f2d2] border p-2 text-xs font-semibold text-gray-700">
                  A1
                </th>
                <th className="bg-[#f6f2d2] border p-2 text-xs font-semibold text-gray-700">
                  A2
                </th>
                <th className="bg-[#f6f2d2] border p-2 text-xs font-semibold text-gray-700">
                  Average
                </th>
                <th className="bg-[#f6eae2] border p-2 text-xs font-semibold text-gray-700">
                  L1
                </th>
                <th className="bg-[#f6eae2] border p-2 text-xs font-semibold text-gray-700">
                  L2
                </th>
                <th className="bg-[#f6eae2] border p-2 text-xs font-semibold text-gray-700">
                  L3
                </th>
                <th className="bg-[#f6eae2] border p-2 text-xs font-semibold text-gray-700">
                  Average
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student, idx) => {
                const globalIdx = (currentPage - 1) * rowsPerPage + idx;
                return (
                  <tr key={student.reg} className="border-t">
                    <td className="border p-2 text-center bg-[#eaf6ea]">
                      {student.sn}
                    </td>
                    <td className="border p-2 text-center bg-[#d2f0d2]">
                      {student.reg}
                    </td>
                    <td className="border p-2 text-center bg-[#d2f0d2]">
                      {student.gender}
                    </td>
                    <td className="border p-2 text-center bg-[#eaf6ea]">
                      {marks[globalIdx].cat1}
                    </td>
                    <td className="border p-2 text-center bg-[#eaf6ea]">
                      {marks[globalIdx].cat2}
                    </td>
                    <td className="border p-2 text-center bg-[#eaf6ea]">
                      {marks[globalIdx].testAvg}
                    </td>
                    <td className="border p-2 text-center bg-[#d2eaf6]">
                      {marks[globalIdx].quiz1}
                    </td>
                    <td className="border p-2 text-center bg-[#d2eaf6]">
                      {marks[globalIdx].quiz2}
                    </td>
                    <td className="border p-2 text-center bg-[#d2eaf6]">
                      {marks[globalIdx].quizAvg}
                    </td>
                    <td className="border p-2 text-center bg-[#f6f2d2]">
                      {marks[globalIdx].a1}
                    </td>
                    <td className="border p-2 text-center bg-[#f6f2d2]">
                      {marks[globalIdx].a2}
                    </td>
                    <td className="border p-2 text-center bg-[#f6f2d2]">
                      {marks[globalIdx].assignAvg}
                    </td>
                    <td className="border p-2 text-center bg-[#f6eae2]">
                      {marks[globalIdx].l1}
                    </td>
                    <td className="border p-2 text-center bg-[#f6eae2]">
                      {marks[globalIdx].l2}
                    </td>
                    <td className="border p-2 text-center bg-[#f6eae2]">
                      {marks[globalIdx].l3}
                    </td>
                    <td className="border p-2 text-center bg-[#f6eae2]">
                      {marks[globalIdx].labAvg}
                    </td>
                    <td className="border p-2 text-center bg-[#e2eaf6]">
                      {marks[globalIdx].exam}
                    </td>
                    <td className="border p-2 text-center bg-[#f6d2d2] font-bold">
                      {marks[globalIdx].total}
                    </td>
                    <td className="border p-2 text-center bg-[#f6d2d2] font-bold">
                      {marks[globalIdx].remark}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
