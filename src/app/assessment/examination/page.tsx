"use client";

import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

interface ExaminationAssessmentContentProps {
  module: string;
  examTitle: string;
  type: string;
  totalMarks: string;
}

function ExaminationAssessmentContent({
  module,
  examTitle,
  type,
  totalMarks,
}: ExaminationAssessmentContentProps) {
  const [submitted, setSubmitted] = useState(false);
  const [approved, setApproved] = useState(false);
  // Example students
  const students = [
    { no: "001", id: "STU001" },
    { no: "002", id: "STU002" },
    { no: "003", id: "STU003" },
    { no: "004", id: "STU004" },
    { no: "005", id: "STU005" },
  ];
  // Questions state
  type Question = { number: number; maxMarks: number; optional: boolean };
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    number: "",
    maxMarks: "",
    optional: false,
  });
  const [marks, setMarks] = useState<{ [studentId: string]: string }>({});
  const [search, setSearch] = useState("");
  const [changed, setChanged] = useState<string[]>([]);

  // Add new question
  const handleAddQuestion = () => {
    if (!newQuestion.number || !newQuestion.maxMarks) return;
    setQuestions([
      ...questions,
      {
        number: Number(newQuestion.number),
        maxMarks: Number(newQuestion.maxMarks),
        optional: newQuestion.optional,
      },
    ]);
    setShowAddQuestion(false);
    setNewQuestion({ number: "", maxMarks: "", optional: false });
  };

  // Filter students
  const filteredStudents = students.filter(
    (s) =>
      s.no.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic for marks table
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <div className="mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => (window.location.href = "/assessment/create")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back to Create Assessment
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
            <div className="font-semibold text-base">{examTitle}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Type</div>
            <div className="font-semibold text-base">
              {type.charAt(0).toUpperCase() + type.slice(1) || "-"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Marks</div>
            <div className="font-semibold text-base">
              {totalMarks + 1 || "-"}
            </div>
          </div>
          {/* ...existing code... */}
        </CardContent>
      </Card>
      <div className="flex gap-3">
        {/* Left: Marks Entry */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>
                Question{" "}
                {selectedQuestion !== null
                  ? questions[selectedQuestion]?.number
                  : "-"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex items-center justify-between">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-9"
                    placeholder="Search by name or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button
                  className="bg-[#026892] hover:bg-[#026892]/90"
                  onClick={() => {
                    /* save grades logic */
                    setChanged([]);
                  }}
                >
                  {changed && changed.length > 0
                    ? `Save Grades (${changed.length})`
                    : "Save Grades"}
                </Button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-bold">NO</th>
                      <th className="text-left p-3 font-bold">Student ID</th>
                      <th className="text-left p-3 font-bold">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.map((student) => (
                      <tr className="border-t" key={student.id}>
                        <td className="p-3">{student.no}</td>
                        <td className="p-3">{student.id}</td>
                        <td className="p-3">
                          <Input
                            className="w-20"
                            placeholder={`0/${
                              selectedQuestion !== null
                                ? questions[selectedQuestion]?.maxMarks
                                : "-"
                            }`}
                            value={marks[student.id] || ""}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setMarks({
                                ...marks,
                                [student.id]: newValue,
                              });
                              setChanged((prev) => {
                                if (
                                  newValue !== "" &&
                                  !prev.includes(student.id)
                                ) {
                                  return [...prev, student.id];
                                } else if (
                                  newValue === "" &&
                                  prev.includes(student.id)
                                ) {
                                  return prev.filter((id) => id !== student.id);
                                }
                                return prev;
                              });
                            }}
                            disabled={selectedQuestion === null}
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
            </CardContent>
          </Card>
        </div>
        {/* Right: Questions List */}
        <div className="w-96">
          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <Button
                className="bg-[#026892] mt-2 hover:bg-[#026892]/90"
                onClick={() => setShowAddQuestion(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {questions.length === 0 && (
                  <div className="text-gray-500">No questions added yet.</div>
                )}
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer ${
                      selectedQuestion === idx
                        ? "bg-blue-50 border-blue-400"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedQuestion(idx)}
                  >
                    <div>
                      <div className="font-semibold">Question {q.number}</div>
                      <div className="text-xs text-gray-600">
                        Max Marks: {q.maxMarks}
                      </div>
                      <div className="text-xs text-gray-600">
                        {q.optional ? "Optional" : "Mandatory"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Add Question Popup */}
          {showAddQuestion && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Question Number
                  </label>
                  <Input
                    type="number"
                    value={newQuestion.number}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, number: e.target.value })
                    }
                  />
                  {questions.some(
                    (q) => q.number === Number(newQuestion.number)
                  ) &&
                    newQuestion.number !== "" && (
                      <p className="text-xs text-red-500 mt-1">
                        This question number already exists.
                      </p>
                    )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Maximum Marks
                  </label>
                  <Input
                    type="number"
                    value={newQuestion.maxMarks}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        maxMarks: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="optional"
                    checked={newQuestion.optional}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        optional: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="optional" className="text-sm">
                    Optional
                  </label>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddQuestion(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#026892]"
                    onClick={handleAddQuestion}
                    disabled={
                      questions.some(
                        (q) => q.number === Number(newQuestion.number)
                      ) ||
                      !newQuestion.number ||
                      !newQuestion.maxMarks
                    }
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import { useSearchParams } from "next/navigation";

export default function ExaminationAssessmentPage() {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const examTitle = searchParams?.get("title") || "Examination Assessment";
  const module = searchParams?.get("module") || "";
  const type = searchParams?.get("type") || "";
  const totalMarks = searchParams?.get("totalMarks") || "";
  return (
    <PortalShell
      title={examTitle}
      description="Add questions and enter marks for students."
    >
      <ExaminationAssessmentContent
        module={module}
        examTitle={examTitle}
        type={type}
        totalMarks={totalMarks}
      />
    </PortalShell>
  );
}
