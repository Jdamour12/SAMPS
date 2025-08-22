"use client";

import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Example assessment types
const assessmentTypes = [
  { id: "exam", name: "Exam", fixed: true },
  { id: "assignment", name: "Assignment", fixed: false },
  { id: "quiz", name: "Quiz", fixed: false },
  { id: "project", name: "Project", fixed: false },
  // Lab is not shown initially, only if added
];

export default function GradesConfigurationPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [newType, setNewType] = useState("");
  const [newMarks, setNewMarks] = useState(0);
  // Initial state: exam is always 50, others default to 0
  const [marks, setMarks] = useState<Record<string, number>>({
    exam: 50,
    assignment: 0,
    quiz: 0,
    project: 0,
  });
  // Calculate total for non-exam
  const nonExamTotal = Object.entries(marks)
    .filter(([key]) => key !== "exam")
    .reduce((sum, [_, val]) => sum + Number(val), 0);
  // Handler for input change
  function handleChange(id: string, value: string) {
    if (id === "exam") return; // exam is fixed
    let num = Math.max(
      0,
      Math.min(50 - nonExamTotal + Number(marks[id]), Number(value))
    );
    setMarks((prev) => ({ ...prev, [id]: num }));
  }
  return (
    <PortalShell
      title="Grades Configuration"
      description="Set maximum marks for each assessment type. Exams are always 50, others must total ≤ 50."
    >
      <div className="w-full h-full px-0  py-4 flex flex-col">
        <Card className="w-full h-full flex flex-col justify-between shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Assessment Types & Maximum Marks
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 flex-1 flex flex-col">
            <div className="flex justify-end gap-2 mb-4">
              <Button className="bg-[#026892] hover:bg-[#026892]/90 text-base px-6 py-2">
                Save Configurations
              </Button>
              <Button variant="outline" className="text-base px-6 py-2">
                Reset
              </Button>
            </div>
            <table className="w-full h-full border rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left font-medium-700">Assessment Type</th>
                  <th className="p-3 text-left font-medium-700">Max Marks</th>
                  <th className="p-3 text-left font-medium-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ...assessmentTypes,
                  ...(marks.lab !== undefined
                    ? [{ id: "lab", name: "Lab", fixed: false }]
                    : []),
                ].map((type, idx, arr) => (
                  <tr
                    key={type.id}
                    className={
                      "font-sm text-gray-800 border-t" +
                      (idx === arr.length - 1
                        ? " border-b-2 border-gray-200"
                        : "")
                    }
                  >
                    <td className="p-3 font-medium">{type.name}</td>
                    <td className="p-3">
                      {type.fixed ? (
                        <span className="font-medium">50</span>
                      ) : (
                        <Input
                          type="number"
                          min={0}
                          max={50 - nonExamTotal + marks[type.id]}
                          value={marks[type.id]}
                          onChange={(e) =>
                            handleChange(type.id, e.target.value)
                          }
                          className="w-20 h-9 text-base"
                        />
                      )}
                    </td>
                    <td className="p-3">
                      {type.fixed ? (
                        <Badge className="bg-blue-100 text-blue-700">
                          Fixed
                        </Badge>
                      ) : (
                        <Badge
                          className={
                            marks[type.id] > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {marks[type.id] > 0 ? "Configured" : "Not Set"}
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between gap-2 mt-4">
              <span
                className={
                  "text-medium text-gray-600 " +
                  (nonExamTotal > 50 ? "text-red-600 font-bold" : "")
                }
              >
                Total for non-exam assessments: {nonExamTotal} / 50
              </span>
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-base px-6 py-2 bg-[#026892] hover:bg-[#026892]/90 text-white hover:text-white">
                    Add Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Assessment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Assessment Type
                      </label>
                      <Select value={newType} onValueChange={setNewType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            { id: "exam", name: "Exam" },
                            { id: "assignment", name: "Assignment" },
                            { id: "quiz", name: "Quiz" },
                            { id: "project", name: "Project" },
                            { id: "lab", name: "Lab" },
                          ]
                            .filter((t) => !(t.id in marks))
                            .map((t) => (
                              <SelectItem key={t.id} value={t.id}>
                                {t.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Max Marks
                      </label>
                      <Input
                        type="number"
                        min={0}
                        max={50 - nonExamTotal}
                        value={newMarks}
                        onChange={(e) => setNewMarks(Number(e.target.value))}
                        className="w-24"
                        disabled={!newType}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      className="bg-[#026892] hover:bg-[#026892]/90"
                      disabled={
                        !newType ||
                        newMarks <= 0 ||
                        newMarks > 50 - nonExamTotal
                      }
                      onClick={() => {
                        if (
                          newType &&
                          newMarks > 0 &&
                          newMarks <= 50 - nonExamTotal
                        ) {
                          setMarks((prev) => ({
                            ...prev,
                            [newType]: newMarks,
                          }));
                          setShowDialog(false);
                          setNewType("");
                          setNewMarks(0);
                        }
                      }}
                    >
                      Add
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
