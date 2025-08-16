"use client";

import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const initialRequests = [
    {
        id: 1,
        student: "STU001",
        type: "Exam",
        date: "2025-08-20",
        module: "Advanced Mathematics",
        reason: "Medical appointment",
        status: "Pending",
        document: "medical_note.pdf",
    },  
    {  
        id: 2,
        student: "STU002",
        type: "Class Lecture",
        date: "2025-08-18",
        module: "Statistics",
        reason: "Family emergency",
        status: "Approved",
        document: "family_letter.jpg",
    },
];

export default function PermissionRequestsPage() {
    const [requests, setRequests] = useState(initialRequests);
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

    function handleStatusChange(id: number, status: string) {
        setRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)));
        setSelectedRequest(null);
    }

    return (
    <PortalShell
        title="Permission Requests"
        description="Review and manage student absence requests for lectures, assessments, and exams."
    >
        <div className="space-y-6">
        <Card className="academic-card">
            <CardHeader>
            <CardTitle className="text-lg">
                Student Absence Permission Requests
            </CardTitle>
            <CardDescription>
                Review, approve, or reject student absence requests
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="p-2 text-left font-medium">Student NO</th>
                    <th className="p-2 text-left font-medium">Type</th>
                    <th className="p-2 text-left font-medium">Date</th>
                    <th className="p-2 text-left font-medium">Module</th>
                    <th className="p-2 text-left font-medium">Reason</th>
                    <th className="p-2 text-left font-medium">Document</th>
                    <th className="p-2 text-left font-medium">Status</th>
                    <th className="p-2 text-left font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                    <tr key={req.id} className="border-t">
                        <td className="p-2">{req.student}</td>
                        <td className="p-2">{req.type}</td>
                        <td className="p-2">{req.date}</td>
                        <td className="p-2">{req.module}</td>
                        <td className="p-2">{req.reason}</td>
                        <td className="p-2">
                        {req.document ? (
                            <a
                            href={`/uploads/${req.document}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                            >
                            {req.document}
                            </a>
                        ) : (
                            <span className="text-gray-400">No file</span>
                        )}
                        </td>
                        <td className="p-2">
                        <Badge
                            className={
                            req.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : req.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                        >
                            {req.status}
                        </Badge>
                        </td>
                        <td className="p-2">
                        {req.status === "Pending" && (
                            <div className="flex gap-2">
                            <Button
                                size="sm"
                                className="bg-[#026892] text-white hover:bg-[#026892]/90"
                                onClick={() =>
                                handleStatusChange(req.id, "Approved")
                                }
                            >
                                Approve
                            </Button>
                            <Button
                                size="sm"
                                className="bg-red-100 text-red-600 hover:bg-red-200"
                                onClick={() =>
                                handleStatusChange(req.id, "Rejected")
                                }
                            >
                                Reject
                            </Button>
                            </div>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </CardContent>
        </Card>
    </div>
    </PortalShell>
);
}
