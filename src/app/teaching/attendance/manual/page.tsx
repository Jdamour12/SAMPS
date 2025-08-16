// "use client";

// import React from "react";
// import { PortalShell } from "@/components/portal-shell";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Search } from "lucide-react";

// const modules = ["Advanced Mathematics", "Physics", "Chemistry", "Programming"];
// const students = [
//   {
//     name: "John Doe",
//     id: "STU001",
//     lastAttendance: "Today, 09:00",
//     status: "Present",
//   },
//   {
//     name: "Sarah Wilson",
//     id: "STU004",
//     lastAttendance: "Today, 09:00",
//     status: "Present",
//   },
//   {
//     name: "Mike Johnson",
//     id: "STU003",
//     lastAttendance: "Today, 09:00",
//     status: "Present",
//   },
  
// ];

// export default function ManualAttendancePage() {
//   const [selectedModule, setSelectedModule] = React.useState(modules[0]);
//   const [search, setSearch] = React.useState("");
//   const [showRecordModal, setShowRecordModal] = React.useState(false);
//   // Today's attendance, empty until recorded
//   const [attendanceToday, setAttendanceToday] = React.useState<
//     { id: string; name: string; status: string }[]
//   >([]);
//   // Modal state for marking attendance
//   const [modalAttendance, setModalAttendance] = React.useState<
//     { id: string; name: string; status: string }[]
//   >([]);
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const rowsPerPage = 5;
//   const filteredStudents = students.filter(
//     (s) =>
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       s.id.toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
//   const paginatedStudents = filteredStudents.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Mark attendance in modal
//   const handleMarkAttendance = (studentId: string, status: string) => {
//     setModalAttendance((prev) =>
//       prev.map((a) => (a.id === studentId ? { ...a, status } : a))
//     );
//   };

//   return (
//     <PortalShell
//       title="Attendance Management"
//       description="Record and track student attendance"
//     >
//       <div className="max-w-5xl mx-auto space-y-6">
//         <div className="flex items-center gap-4 mb-4">
//           <Select value={selectedModule} onValueChange={setSelectedModule}>
//             <SelectTrigger className="w-64">
//               <SelectValue placeholder="Select Module" />
//             </SelectTrigger>
//             <SelectContent>
//               {modules.map((m) => (
//                 <SelectItem key={m} value={m}>
//                   {m}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Button
//             className="bg-[#026892] text-white flex items-center gap-2"
//             onClick={() => {
//               setModalAttendance(
//                 students.map((s) => ({
//                   id: s.id,
//                   name: s.name,
//                   status: "Absent",
//                 }))
//               );
//               setShowRecordModal(true);
//             }}
//           >
//             <span className="inline-block">
//               <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//                 <path
//                   d="M12 4v16m8-8H4"
//                   stroke="#fff"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </span>
//             Record Attendance
//           </Button>
//         </div>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Attendance Records</CardTitle>
//             <CardDescription>
//               Today's attendance for {selectedModule}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {attendanceToday.length === 0 ? (
//               <div className="text-center text-gray-400 py-8">
//                 No attendance recorded yet for today.
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="text-left p-3 font-medium">
//                         Student Name
//                       </th>
//                       <th className="text-left p-3 font-medium">Student ID</th>
//                       <th className="text-left p-3 font-medium">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {attendanceToday.map((a) => (
//                       <tr key={a.id} className="border-t">
//                         <td className="p-3 whitespace-nowrap">{a.name}</td>
//                         <td className="p-3 whitespace-nowrap">{a.id}</td>
//                         <td className="p-3 whitespace-nowrap">
//                           <Badge
//                             className={
//                               a.status === "Present"
//                                 ? "bg-green-100 text-green-700"
//                                 : a.status === "Absent"
//                                 ? "bg-red-100 text-red-700"
//                                 : "bg-yellow-100 text-yellow-700"
//                             }
//                           >
//                             {a.status}
//                           </Badge>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//         {/* Record Attendance Modal */}
//         {showRecordModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative animate-fadeIn">
//               <button
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
//                 onClick={() => setShowRecordModal(false)}
//                 aria-label="Close"
//               >
//                 &times;
//               </button>
//               <h2 className="text-lg font-bold mb-2">
//                 Record Attendance - {selectedModule}
//               </h2>
//               <p className="text-sm text-gray-500 mb-4">
//                 Mark students as present or absent for today's session. Students
//                 marked as present will be automatically recorded with the
//                 current timestamp.
//               </p>
//               <form
//                 className="space-y-4"
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   setAttendanceToday([...modalAttendance]);
//                   setShowRecordModal(false);
//                 }}
//               >
//                 <div style={{ maxHeight: 400, overflowY: "auto" }}>
//                   <table className="w-full mb-4">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="text-left p-3 font-medium">
//                           Student Name
//                         </th>
//                         <th className="text-left p-3 font-medium">
//                           Student ID
//                         </th>
//                         <th className="text-left p-3 font-medium">
//                           Mark Attendance
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {modalAttendance.map((s) => (
//                         <tr key={s.id} className="border-t">
//                           <td className="p-3 whitespace-nowrap">{s.name}</td>
//                           <td className="p-3 whitespace-nowrap">{s.id}</td>
//                           <td className="p-3 whitespace-nowrap flex gap-2">
//                             <Button
//                               type="button"
//                               className={`px-4 py-1 rounded font-semibold text-sm border transition-all bg-[#026892] text-white border-[#026892] hover:bg-[#035B8A]"}`}
//                               style={{ minWidth: 90 }}
//                               onClick={() =>
//                                 handleMarkAttendance(s.id, "Present")
//                               }
//                             >
//                               Present
//                             </Button>
//                             <Button
//                               type="button"
//                               className={`px-4 py-1 rounded font-semibold text-sm border transition-all bg-red-100 text-red-700 border-red-300 hover:bg-red-200"}`}
//                               style={{ minWidth: 90 }}
//                               onClick={() =>
//                                 handleMarkAttendance(s.id, "Absent")
//                               }
//                             >
//                               Absent
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="flex justify-end gap-2 mt-6">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setShowRecordModal(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" className="bg-[#026892]">
//                     Save Attendance
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </PortalShell>
//   );
// }
