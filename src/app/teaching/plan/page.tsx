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
import { useState } from "react";

interface TeachingPlan {
  id: number;
  module: string;
  lastUpdated: string;
  status: "Approved" | "Pending Review" | "Draft";
  objectives: string;
  weeks: Array<{
    week: number;
    topic: string;
    resources: string;
    assessment: string;
  }>;
  history: Array<{ date: string; changes: string }>;
}

const initialPlans: TeachingPlan[] = [
  {
    id: 1,
    module: "Advanced Mathematics",
    lastUpdated: "2 days ago",
    status: "Approved",
    objectives: "Understand advanced calculus and linear algebra.",
    weeks: [
      {
        week: 1,
        topic: "Limits & Continuity",
        resources: "Textbook Ch.1",
        assessment: "Quiz",
      },
      {
        week: 2,
        topic: "Derivatives",
        resources: "Lecture notes",
        assessment: "Assignment",
      },
    ],
    history: [
      { date: "2025-08-13", changes: "Initial plan created." },
      { date: "2025-08-14", changes: "Objectives updated." },
    ],
  },
  {
    id: 2,
    module: "Statistics",
    lastUpdated: "1 week ago",
    status: "Pending Review",
    objectives: "Master probability and statistical inference.",
    weeks: [
      {
        week: 1,
        topic: "Probability Basics",
        resources: "Textbook Ch.2",
        assessment: "Quiz",
      },
      {
        week: 2,
        topic: "Distributions",
        resources: "Lecture notes",
        assessment: "Assignment",
      },
    ],
    history: [{ date: "2025-08-10", changes: "Initial plan created." }],
  },
];

function TeachingPlanContent() {
  const [plans, setPlans] = useState<TeachingPlan[]>(initialPlans);
  const [selectedPlan, setSelectedPlan] = useState<TeachingPlan | null>(null);
  const [showForm, setShowForm] = useState(false);

  function handleEdit(plan: TeachingPlan) {
    setSelectedPlan(plan);
    setShowForm(true);
  }
  function handleAdd() {
    setSelectedPlan(null);
    setShowForm(true);
  }
  function handleDelete(id: number) {
    setPlans(plans.filter((p) => p.id !== id));
  }
  function handleSave(plan: TeachingPlan) {
    if (plan.id) {
      setPlans(plans.map((p) => (p.id === plan.id ? plan : p)));
    } else {
      setPlans([...plans, { ...plan, id: Date.now() }]);
    }
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Teaching Plan Overview</CardTitle>
          <CardDescription>Manage your semester teaching plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-end">
            <Button
              size="sm"
              onClick={handleAdd}
              className="bg-[#026892] text-white hover:bg-[#026892]/90"
            >
              Add New Plan
            </Button>
          </div>
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">
                      {plan.module} - Teaching Plan
                    </h3>
                    <p className="text-sm text-gray-600">
                      Last updated: {plan.lastUpdated}
                    </p>
                    <p className="text-xs text-gray-700">
                      Objectives: {plan.objectives}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className={
                        plan.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : plan.status === "Pending Review"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {plan.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(plan)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200"
                      onClick={() => handleDelete(plan.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="mt-2">
                  <strong>Weekly Breakdown:</strong>
                  <ul className="ml-4 list-disc text-xs">
                    {plan.weeks.map((w) => (
                      <li key={w.week}>
                        Week {w.week}: {w.topic} | Resources: {w.resources} |
                        Assessment: {w.assessment}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <strong>History:</strong>
                  <ul className="ml-4 list-disc text-xs">
                    {plan.history.map((h, idx) => (
                      <li key={idx}>
                        {h.date}: {h.changes}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {showForm && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              {/* Simple form for demo purposes */}
              <h3 className="font-semibold mb-2">
                {selectedPlan ? "Edit" : "Add"} Teaching Plan
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as typeof e.target & {
                    module: { value: string };
                    objectives: { value: string };
                  };
                  handleSave({
                    id: selectedPlan?.id ?? 0,
                    module: form.module.value,
                    lastUpdated: "Just now",
                    status: selectedPlan?.status ?? "Draft",
                    objectives: form.objectives.value,
                    weeks: selectedPlan?.weeks ?? [],
                    history: selectedPlan?.history ?? [],
                  });
                }}
              >
                <div className="mb-2">
                  <label className="block text-xs font-medium">
                    Module Name
                  </label>
                  <input
                    name="module"
                    defaultValue={selectedPlan?.module ?? ""}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-medium">
                    Objectives
                  </label>
                  <input
                    name="objectives"
                    defaultValue={selectedPlan?.objectives ?? ""}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-[#026892] text-white"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function TeachingPlanPage() {
  return (
    <PortalShell
      title="Teaching Plan"
      description="Create and manage your teaching plans for the semester."
    >
      <TeachingPlanContent />
    </PortalShell>
  );
}
