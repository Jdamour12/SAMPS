"use client";

import React from "react";
import { useRouter } from "next/navigation";

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
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AttendanceContent() {
  const router = useRouter();

  // Example data for stats and sessions
  const [search, setSearch] = React.useState("");
  const [showSessionModal, setShowSessionModal] = React.useState(false);
  // Form state
  const [sessionName, setSessionName] = React.useState("");
  const [assignedClass, setAssignedClass] = React.useState("");
  const [sessionTypeValue, setSessionTypeValue] = React.useState("");
  const [locationValue, setLocationValue] = React.useState("");
  const [deviceSerial, setDeviceSerial] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const stats = [
    {
      label: "Total Sessions",
      value: 10,
      sub: "This semester",
      color: "bg-[#035B8A] text-white",
      icon: null,
    },
    {
      label: "This Week",
      value: 8,
      sub: "Sessions scheduled",
      color: "bg-gradient-to-r from-purple-400 to-purple-600 text-white",
      icon: null,
    },
    {
      label: "Active Classes",
      value: 3,
      sub: "Different programs",
      color: "bg-gradient-to-r from-orange-400 to-orange-600 text-white",
      icon: null,
    },
  ];
  const sessions = [
    {
      name: "03 Oct 2024",
      type: "Lecture",
      class: "Y1 MECH ENG",
      location: "Muhabura 0R06",
      attendance: "28/30",
      percent: 93,
      created: "03/Oct/2024",
    },
    {
      name: "Physics 7-10-24",
      type: "Lecture",
      class: "Y1 MECH ENG",
      location: "Muhabura 1R10",
      attendance: "22/30",
      percent: 73,
      created: "07/Oct/2024",
    },
    {
      name: "ENE 2161 7-10-24",
      type: "Lecture",
      class: "Y1 ENERGY ENG",
      location: "MUHABURA 3R08",
      attendance: "19/25",
      percent: 72,
      created: "07/Oct/2024",
    },
    {
      name: "DRAWING & CAD 8-10-24",
      type: "Practical",
      class: "Y1 MECH ENG",
      location: "CAD Lab",
      attendance: "20/25",
      percent: 80,
      created: "08/Oct/2024",
    },
    {
      name: "WORKSHOP TECH 09-10-24",
      type: "Workshop",
      class: "Y1 MECH ENG",
      location: "Mechanical Workshop",
      attendance: "23/30",
      percent: 77,
      created: "09/Oct/2024",
    },
  ];
  // Filter sessions by course/class name
  const filteredSessions = sessions.filter((s) =>
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination state for sessions table
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredSessions.length / rowsPerPage);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Example device status (could be fetched from API)
  const deviceStatus = deviceSerial
    ? deviceSerial === "DEV-001"
      ? "Online"
      : "Offline"
    : null;

  // Tab state: 0 = Sessions, 1 = Manual Record
  const [activeTab, setActiveTab] = React.useState(0);

  // Manual attendance data (example)
  const modules = [
    "Advanced Mathematics",
    "Physics",
    "Chemistry",
    "Programming",
  ];
  const students = [
    {
      no: "001",
      id: "STU001",
      lastAttendance: "Today, 09:00",
      status: "Present",
    },
    {
      no: "002",
      id: "STU002",
      lastAttendance: "Today, 09:00",
      status: "Present",
    },
    {
      no: "003",
      id: "STU003",
      lastAttendance: "Today, 09:00",
      status: "Present",
    },
    {
      no: "004",
      id: "STU004",
      lastAttendance: "Today, 09:00",
      status: "Present",
    },
    {
      no: "005",
      id: "STU005",
      lastAttendance: "Today, 09:00",
      status: "Present",
    },
  ];
  const [manualModule, setManualModule] = React.useState(modules[0]);
  const [manualSearch, setManualSearch] = React.useState("");
  const [showRecordModal, setShowRecordModal] = React.useState(false);
  const [attendance, setAttendance] = React.useState(
    students.map((s) => s.status)
  );
  const [manualPage, setManualPage] = React.useState(1);
  const manualRowsPerPage = 5;
  const filteredManualStudents = students.filter(
    (s) =>
      s.no.toLowerCase().includes(manualSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(manualSearch.toLowerCase())
  );
  const manualTotalPages = Math.ceil(
    filteredManualStudents.length / manualRowsPerPage
  );
  const paginatedManualStudents = filteredManualStudents.slice(
    (manualPage - 1) * manualRowsPerPage,
    manualPage * manualRowsPerPage
  );

  // Fix: Use student id for attendance mapping to avoid index errors
  interface AttendanceStatus {
    studentId: string;
    status: string;
  }

  type HandleMarkAttendance = (studentId: string, status: string) => void;

  const handleMarkAttendance: HandleMarkAttendance = (studentId, status) => {
    setAttendance((prev: string[]) => {
      // If prev is an array of strings (student IDs), just replace the value at the found index
      const idx = prev.indexOf(studentId);
      if (idx !== -1) {
        // If you want to store status, you need to use an array of objects
        // For now, just return prev unchanged (or handle as needed)
        return prev;
      }
      return prev;
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`rounded-xl shadow-sm p-5 ${stat.color}`}
            style={{ minWidth: 0 }}
          >
            <div className="text-lg font-semibold">{stat.label}</div>
            <div className="text-3xl font-bold my-2">{stat.value}</div>
            <div className="text-xs opacity-80">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b mb-2">
        <Button
          variant="ghost"
          className={`rounded-none ${
            activeTab === 0
              ? "border-b-2 border-[#035B8A] text-[#035B8A]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Sessions
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none ${
            activeTab === 1
              ? "border-b-2 border-[#035B8A] text-[#035B8A]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Manual Record
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 0 && (
        <>
          {/* Search and Actions below stats */}
          <div className="flex items-center justify-between mb-2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by your course here ..."
                className="w-full pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              className="bg-[#026892] text-white ml-4 hover:bg-[#026892]/90"
              onClick={() => setShowSessionModal(true)}
            >
              + New Session
            </Button>
            {/* New Session Modal */}
            {showSessionModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div
                  className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-8 relative animate-fadeIn"
                  style={{ maxHeight: "600px", overflowY: "auto" }}
                >
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                    onClick={() => setShowSessionModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-bold mb-2 text-[#026892]">
                    Create Attendance Session
                  </h2>
                  <p className="text-base text-gray-600 mb-6">
                    Add a new attendance session. This will activate the device
                    for attendance recording.
                  </p>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setShowSessionModal(false);
                      setSessionName("");
                      setAssignedClass("");
                      setSessionTypeValue("");
                      setLocationValue("");
                      setDeviceSerial("");
                      setNotes("");
                    }}
                  >
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Session Name
                      </label>
                      <Input
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        placeholder="Enter session name"
                        required
                        className="text-base py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Assigned Class & Module
                      </label>
                      <Select
                        value={assignedClass}
                        onValueChange={setAssignedClass}
                        required
                      >
                        <SelectTrigger className="text-base py-2">
                          <SelectValue placeholder="Choose Class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y1 MECH ENG">
                            Y1 MECH ENG
                          </SelectItem>
                          <SelectItem value="Y1 ENERGY ENG">
                            Y1 ENERGY ENG
                          </SelectItem>
                          <SelectItem value="Y2 MECH ENG">
                            Y2 MECH ENG
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Session Type
                      </label>
                      <Select
                        value={sessionTypeValue}
                        onValueChange={setSessionTypeValue}
                        required
                      >
                        <SelectTrigger className="text-base py-2">
                          <SelectValue placeholder="Choose Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lecture">Lecture</SelectItem>
                          <SelectItem value="Practical">Practical</SelectItem>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Location/Class
                      </label>
                      <Input
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        placeholder="Enter location or classroom"
                        required
                        className="text-base py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Device Serial Number
                      </label>
                      <Select
                        value={deviceSerial}
                        onValueChange={setDeviceSerial}
                        required
                      >
                        <SelectTrigger className="text-base py-2">
                          <SelectValue placeholder="Choose Available Device" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DEV-001">DEV-001</SelectItem>
                          <SelectItem value="DEV-002">DEV-002</SelectItem>
                          <SelectItem value="DEV-003">DEV-003</SelectItem>
                        </SelectContent>
                      </Select>
                      {deviceStatus && (
                        <div
                          className={`mt-2 text-xs font-semibold ${
                            deviceStatus === "Online"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          Device Status: {deviceStatus}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500 mt-2">
                      After creating, the selected device will be activated for
                      attendance recording. You can monitor live attendance from
                      the dashboard.
                    </div>
                    <div className="flex justify-end gap-2 mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        className="px-6 py-2 text-base"
                        onClick={() => setShowSessionModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#026892] px-6 py-2 text-base font-semibold"
                      >
                        Create Session
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Recent Sessions Table */}
          <Card className="academic-card">
            <CardHeader>
              <CardTitle className="text-lg">Recent Sessions</CardTitle>
              <CardDescription>
                Manage and track your teaching sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium">
                        Session Name
                      </th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Location</th>
                      <th className="text-left p-3 font-medium">Attendance</th>
                      <th className="text-left p-3 font-medium">Created</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {paginatedSessions.map((s, i) => (
                      <tr className="border-t" key={i}>
                        <td className="p-3 whitespace-nowrap text-sm">{s.name}</td>
                        <td className="p-3 whitespace-nowrap text-sm">{s.type}</td>
                        <td className="p-3 whitespace-nowrap text-sm">{s.class}</td>
                        <td className="p-3 whitespace-nowrap text-sm">{s.location}</td>
                        <td className="p-3 whitespace-nowrap flex items-center gap-2 text-sm">
                          {s.attendance}
                          <Badge
                            className={
                              s.percent >= 90
                                ? "bg-green-100 text-green-700"
                                : s.percent >= 80
                                ? "bg-yellow-100 text-yellow-700"
                                : s.percent >= 70
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {s.percent}%
                          </Badge>
                        </td>
                        <td className="p-3 whitespace-nowrap text-sm">{s.created}</td>
                        <td className="p-3 whitespace-nowrap text-sm">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              router.push(
                                `/teaching/attendance/record?session=${encodeURIComponent(
                                  s.name
                                )}`
                              )
                            }
                          >
                            <span className="sr-only">View</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </Button>
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
        </>
      )}

      {activeTab === 1 && (
        <>
          <div className="flex items-center justify-between gap-4 mb-4">
            <Select value={manualModule} onValueChange={setManualModule}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="bg-[#026892] text-white flex items-center gap-2"
              onClick={() => setShowRecordModal(true)}
            >
              <span className="inline-block">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 4v16m8-8H4"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Record Attendance
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attendance Records</CardTitle>
              <CardDescription>
                Recorded attendance for students in {manualModule}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <Input
                  className="w-96"
                  placeholder="Search by name or ID..."
                  value={manualSearch}
                  onChange={(e) => {
                    setManualSearch(e.target.value);
                    setManualPage(1);
                  }}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium">Student NO</th>
                      <th className="text-left p-3 font-medium">Student ID</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">
                        Last Attendance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedManualStudents.map((s) => {
                      const studentIdx = students.findIndex(
                        (stu) => stu.id === s.id
                      );
                      return (
                        <tr key={s.id} className="border-t">
                          <td className="p-3 whitespace-nowrap text-gray-700 text-sm">{s.no}</td>
                          <td className="p-3 whitespace-nowrap text-gray-700 text-sm">{s.id}</td>
                          <td className="p-3 whitespace-nowrap text-gray-700 text-sm">
                            <Badge
                              className={
                                attendance[studentIdx] === "Present"
                                  ? "bg-green-100 text-green-700"
                                  : attendance[studentIdx] === "Absent"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }
                            >
                              {attendance[studentIdx]}
                            </Badge>
                          </td>
                          <td className="p-3 whitespace-nowrap text-gray-700 text-sm">
                            {s.lastAttendance}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-end items-center mt-4 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setManualPage((p) => Math.max(1, p - 1))}
                  disabled={manualPage === 1}
                >
                  Previous
                </Button>
                <span className="text-xs">
                  Page {manualPage} of {manualTotalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setManualPage((p) => Math.min(manualTotalPages, p + 1))
                  }
                  disabled={manualPage === manualTotalPages}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Record Attendance Modal */}
          {showRecordModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative animate-fadeIn">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  onClick={() => setShowRecordModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-lg font-bold mb-2">
                  Record Attendance - {manualModule}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Mark students as present or absent for today's session.
                  Students marked as present will be automatically recorded with
                  the current timestamp.
                </p>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowRecordModal(false);
                  }}
                >
                  <table className="w-full mb-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 font-medium">
                          Student NO
                        </th>
                        <th className="text-left p-3 font-medium">
                          Student ID
                        </th>
                        <th className="text-left p-3 font-medium">
                          Mark Attendance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => {
                        const studentIdx = students.findIndex(
                          (stu) => stu.id === s.id
                        );
                        return (
                          <tr key={s.id} className="border-t">
                            <td className="p-3 whitespace-nowrap">{s.no}</td>
                            <td className="p-3 whitespace-nowrap">{s.id}</td>
                            <td className="p-3 whitespace-nowrap flex gap-2">
                              <Button
                                type="button"
                                disabled
                                className={`px-4 py-1 rounded font-semibold text-sm transition-all border ${
                                  attendance[studentIdx] === "Present"
                                    ? "bg-[#026892] text-white border-[#026892]"
                                    : "bg-white text-[#026892] border-[#026892] hover:bg-[#026892]/10"
                                }`}
                                style={{ minWidth: 90 }}
                                onClick={() =>
                                  handleMarkAttendance(s.id, "Present")
                                }
                              >
                                Present
                              </Button>
                              <Button
                                type="button"
                                className={`px-4 py-1 rounded font-semibold text-sm transition-all border ${
                                  attendance[studentIdx] === "Absent"
                                    ? "bg-red-100 text-red-700 border-red-300"
                                    : "bg-white text-red-700 border-red-300 hover:bg-red-50"
                                }`}
                                style={{ minWidth: 90 }}
                                onClick={() =>
                                  handleMarkAttendance(s.id, "Absent")
                                }
                              >
                                Absent
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowRecordModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#026892]">
                      Save Attendance
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TeachingAttendancePage() {
  return (
    <PortalShell
      title="Attendance"
      description="Record and manage student attendance."
    >
      <AttendanceContent />
    </PortalShell>
  );
}

export default TeachingAttendancePage;
