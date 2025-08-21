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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const years = ["Year 1", "Year 2", "Year 3", "Year 4"];
const students = Array.from({ length: 30 }, (_, i) => ({
  studentNo: (i + 1).toString().padStart(3, "0"),
  studentId: `STU${(i + 1).toString().padStart(3, "0")}`,
  email: `student${(i + 1).toString().padStart(3, "0")}@student.ur.ac.rw`,
  status: i % 3 === 0 ? "Inactive" : "Active",
  year: "Year 1",
}));

function ClassListsContent() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const pageSize = 10;

  // Remove year filtering from table
  const filteredStudents = students.filter(
    (student) =>
      student.studentNo.includes(search) ||
      student.studentId.includes(search) ||
      student.email.includes(search)
  );
  // Always sort by studentNo ascending
  const sortedStudents = [...filteredStudents].sort((a, b) =>
    a.studentNo.localeCompare(b.studentNo)
  );
  const pageCount = Math.ceil(sortedStudents.length / pageSize);
  const pagedStudents = sortedStudents.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Class Lists</CardTitle>
          <CardDescription>
            View and manage your class student lists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 md:gap-3 items-center">
              <Select defaultValue="computer-science">
                <SelectTrigger className="w-[180px] rounded-md border-gray-300 focus:ring-2 focus:ring-blue-200">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="information-technology">
                    Information Technology
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px] rounded-md border-gray-300 focus:ring-2 focus:ring-blue-200">
                  <SelectValue placeholder="Year of Study" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Search Student NO, ID, Email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-[300px] rounded-md border-gray-300 focus:ring-2 focus:ring-blue-200"
                size={1}
              />
              <Button className="bg-[#026892] hover:bg-[#026892]/90 ml-auto">
                Export List
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Student NO</th>
                    <th className="text-left p-3 font-medium">Student ID</th>
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Year</th>
                    <th className="text-left p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedStudents.map((student) => (
                    <tr className="border-t" key={student.studentId}>
                      <td className="p-3 text-gray-700 text-sm">
                        {student.studentNo}
                      </td>
                      <td className="p-3 font-bold text-gray-800">
                        {student.studentId}
                      </td>
                      <td className="p-3 text-gray-700 text-sm">
                        {student.email}
                      </td>
                      <td className="p-3 text-gray-700 text-sm">
                        {student.year}
                      </td>
                      <td className="p-3 text-gray-700 text-sm">
                        <Badge
                          className={
                            student.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {student.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end items-center gap-2 p-3 bg-gray-50">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <span className="text-xs">
                  Page {page} of {pageCount}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === pageCount}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function StudentListsPage() {
  return (
    <PortalShell
      title="Class Lists"
      description="View and manage your class student lists."
    >
      <ClassListsContent />
    </PortalShell>
  );
}
