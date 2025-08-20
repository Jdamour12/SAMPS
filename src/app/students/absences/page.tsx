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
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function StudentAbsencesContent() {
  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardContent>
          <div className="flex justify-between items-center mb-6 mt-5">
            <div>
              <CardTitle className="text-lg">Absence Tracking</CardTitle>
              <CardDescription>
                Monitor and manage student absences
              </CardDescription>
            </div>
            <div className="flex gap-4">
              <Select defaultValue="computer-science">
                <SelectTrigger className="w-[200px]">
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
              <Select defaultValue="Year 1">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Year of Study" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Year 1">Year 1</SelectItem>
                  <SelectItem value="Year 2">Year 2</SelectItem>
                  <SelectItem value="Year 3">Year 3</SelectItem>
                  <SelectItem value="Year 4">Year 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-900">
                    High Absence Rate
                  </span>
                </div>
                <p className="text-2xl font-bold text-red-600 mt-2">
                  5 Students
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-900">
                    Recent Absences
                  </span>
                </div>
                <p className="text-2xl font-bold text-orange-600 mt-2">
                  12 Today
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">
                    Perfect Attendance
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  28 Students
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              {/** Table data and pagination logic */}
              {(() => {
                const absences = [
                  {
                    reg: "222013116",
                    total: 8,
                    last: "Oct 18, 2024",
                    status: "At Risk",
                  },
                  {
                    reg: "222006682",
                    total: 3,
                    last: "Oct 15, 2024",
                    status: "Good",
                  },
                  {
                    reg: "222014789",
                    total: 5,
                    last: "Oct 10, 2024",
                    status: "At Risk",
                  },
                  {
                    reg: "222012345",
                    total: 1,
                    last: "Oct 12, 2024",
                    status: "Good",
                  },
                  {
                    reg: "222011111",
                    total: 7,
                    last: "Oct 17, 2024",
                    status: "At Risk",
                  },
                  {
                    reg: "222022222",
                    total: 2,
                    last: "Oct 14, 2024",
                    status: "Good",
                  },
                  {
                    reg: "222033333",
                    total: 6,
                    last: "Oct 16, 2024",
                    status: "At Risk",
                  },
                  {
                    reg: "222044444",
                    total: 4,
                    last: "Oct 13, 2024",
                    status: "Good",
                  },
                ];
                const [page, setPage] = useState(1);
                const pageSize = 4;
                const pageCount = Math.ceil(absences.length / pageSize);
                const pagedAbsences = absences.slice(
                  (page - 1) * pageSize,
                  page * pageSize
                );
                return (
                  <>
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 font-medium">
                            Reg Number
                          </th>
                          <th className="text-left p-3 font-medium">
                            Total Absences
                          </th>
                          <th className="text-left p-3 font-medium">
                            Last Absence
                          </th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-gray-700">
                        {pagedAbsences.map((row, idx) => (
                          <tr key={row.reg} className="border-t">
                            <td className="p-3">{row.reg}</td>
                            <td className="p-3">{row.total}</td>
                            <td className="p-3">{row.last}</td>
                            <td className="p-3">
                              <Badge
                                className={
                                  row.status === "At Risk"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                }
                              >
                                {row.status}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Button size="sm" variant="outline">
                                {row.status === "At Risk" ? "Contact" : "View"}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-end items-center gap-2 p-4">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                      >
                        Previous
                      </Button>
                      <span className="text-sm">
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
                  </>
                );
              })()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function StudentAbsencesPage() {
  return (
    <PortalShell
      title="Student Absences"
      description="Track and manage student absences and attendance issues."
    >
      <StudentAbsencesContent />
    </PortalShell>
  );
}
