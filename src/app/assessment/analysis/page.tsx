"use client";

import { PortalShell } from "@/components/portal-shell";
import { useSearchParams } from "next/navigation";
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
  Activity,
  AlertTriangle,
  Award,
  BarChart3,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

function AssessmentAnalysisContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => (window.location.href = "/assessment/grades")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronRight className="h-4 w-4 rotate-180 mr-2" />
          Back to Grades
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="academic-card border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-blue-600">78.5%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="academic-card border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold text-green-600">92%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="academic-card border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Highest Score</p>
                <p className="text-2xl font-bold text-orange-600">95%</p>
              </div>
              <Award className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="academic-card border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">At Risk</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Grade Distribution Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of assessment performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-medium">Grade Distribution</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">A (80-100%)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-3/4 h-2 bg-green-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">B (60-79%)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-2/3 h-2 bg-blue-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">C (40-59%)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-1/2 h-2 bg-yellow-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">F (0-39%)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div className="w-1/4 h-2 bg-red-500 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">Performance Insights</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-green-600">
                    • Strong performance in theoretical questions
                  </p>
                  <p className="text-orange-600">
                    • Moderate difficulty with practical applications
                  </p>
                  <p className="text-red-600">
                    • Low scores in problem-solving sections
                  </p>
                  <p className="text-blue-600">
                    • Overall improvement from previous assessment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AssessmentAnalysisPage() {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const moduleCode = searchParams ? searchParams.get("module") : null;
  const moduleTitle = moduleCode
    ? `Assessment Analysis - ${moduleCode}`
    : "Assessment Analysis";
  const moduleDesc = moduleCode
    ? `Analyze assessment results for module: ${moduleCode}`
    : "Analyze assessment results and student performance data.";
  return (
    <PortalShell title={moduleTitle} description={moduleDesc}>
      <AssessmentAnalysisContent />
    </PortalShell>
  );
}
