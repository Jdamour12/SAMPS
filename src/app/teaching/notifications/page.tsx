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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Award,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Search,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

function StudentNotificationsContent() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="academic-card border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Active Students
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,234</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last semester
            </p>
          </CardContent>
        </Card>
        <Card className="academic-card border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Attendance Rate
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87.5%</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +2.1% from last week
            </p>
          </CardContent>
        </Card>
        <Card className="academic-card border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Pending Tasks
            </CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <p className="text-xs text-orange-600 mt-1">5 high priority</p>
          </CardContent>
        </Card>
        <Card className="academic-card border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Completion Rate
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94.2%</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
        <div className="lg:col-span-3">
          <Card className="academic-card">
            <CardHeader>
              <CardTitle className="text-lg">Compose Notification</CardTitle>
              <CardDescription>
                Send notifications to your students via email, SMS, or in-app
                messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Notification Type
                    </label>
                    <Select defaultValue="marks">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marks">📊 Marks Released</SelectItem>
                        <SelectItem value="assignment">
                          📝 Assignment Notification
                        </SelectItem>
                        <SelectItem value="exam">
                          🎓 Exam Announcement
                        </SelectItem>
                        <SelectItem value="class">🏫 Class Update</SelectItem>
                        <SelectItem value="deadline">
                          ⏰ Deadline Reminder
                        </SelectItem>
                        <SelectItem value="material">
                          📚 New Material
                        </SelectItem>
                        <SelectItem value="general">
                          📢 General Announcement
                        </SelectItem>
                        <SelectItem value="urgent">🚨 Urgent Notice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Module</label>
                    <Select defaultValue="advanced-math">
                      <SelectTrigger>
                        <SelectValue placeholder="Select module" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advanced-math">
                          Advanced Mathematics
                        </SelectItem>
                        <SelectItem value="statistics">Statistics</SelectItem>
                        <SelectItem value="all">All My Modules</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Recipients</label>
                  <div className="grid gap-2 md:grid-cols-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="recipients"
                        value="all"
                        className="rounded"
                        defaultChecked
                      />
                      <span className="text-sm">All Students (45)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="recipients"
                        value="group"
                        className="rounded"
                      />
                      <span className="text-sm">Specific Group</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="recipients"
                        value="individual"
                        className="rounded"
                      />
                      <span className="text-sm">Individual Students</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Delivery Method</label>
                  <div className="grid gap-2 md:grid-cols-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked
                      />
                      <span className="text-sm">📧 Email</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked
                      />
                      <span className="text-sm">🔔 In-App Notification</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">📱 SMS</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="e.g., Midterm Exam Results Available" />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={6}
                    placeholder={`Dear Students,\n\nI hope this message finds you well. I am pleased to inform you that the results for your recent midterm examination in Advanced Mathematics are now available on the academic portal.\n\nPlease log in to view your individual results and feedback. If you have any questions or concerns about your performance, please don't hesitate to reach out during my office hours.\n\nBest regards,\nDr. John Doe`}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Send Option</label>
                    <Select defaultValue="now">
                      <SelectTrigger>
                        <SelectValue placeholder="When to send" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Send Now</SelectItem>
                        <SelectItem value="schedule">
                          Schedule for Later
                        </SelectItem>
                        <SelectItem value="draft">Save as Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Priority Level
                    </label>
                    <Select defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">🟢 Low</SelectItem>
                        <SelectItem value="normal">🟡 Normal</SelectItem>
                        <SelectItem value="high">🟠 High</SelectItem>
                        <SelectItem value="urgent">🔴 Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-6 pt-2">
                  <Button className="bg-[#026892] hover:bg-[#026892]/90">
                    <Bell className="mr-2 h-4 w-4" />
                    Send Notification
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="academic-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
              <CardDescription>Pre-made notification templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-transparent"
                  size="sm"
                >
                  <Award className="mr-2 h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium">Marks Available</p>
                    <p className="text-xs text-gray-600">
                      Assessment results ready
                    </p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-transparent"
                  size="sm"
                >
                  <Clock className="mr-2 h-4 w-4 text-orange-600" />
                  <div>
                    <p className="font-medium">Assignment Reminder</p>
                    <p className="text-xs text-gray-600">
                      Deadline approaching
                    </p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-transparent"
                  size="sm"
                >
                  <Calendar className="mr-2 h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium">Class Cancelled</p>
                    <p className="text-xs text-gray-600">
                      Schedule change notice
                    </p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-transparent"
                  size="sm"
                >
                  <FileText className="h-5 w-5 text-[#026892]" />
                  <div>
                    <p className="font-medium">New Material</p>
                    <p className="text-xs text-gray-600">Resources uploaded</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="academic-card">
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
              <CardDescription>Notification statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sent</span>
                  <span className="font-medium text-green-600">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Delivered</span>
                  <span className="font-medium text-blue-600">22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Read Rate</span>
                  <span className="font-medium text-purple-600">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Responses</span>
                  <span className="font-medium text-orange-600">7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Notifications</CardTitle>
          <CardDescription>
            Your recently sent notifications and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Subject</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Recipients</th>
                    <th className="text-left p-3 font-medium">Sent</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">Midterm Results Available</p>
                        <p className="text-sm text-gray-600">
                          Advanced Mathematics
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className="bg-blue-100 text-blue-700">
                        📊 Marks
                      </Badge>
                    </td>
                    <td className="p-3">45 students</td>
                    <td className="p-3">2 hours ago</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">
                          Delivered (43/45)
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Resend
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">Assignment 3 Due Tomorrow</p>
                        <p className="text-sm text-gray-600">Statistics</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className="bg-orange-100 text-orange-700">
                        ⏰ Reminder
                      </Badge>
                    </td>
                    <td className="p-3">38 students</td>
                    <td className="p-3">1 day ago</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">
                          Delivered (38/38)
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Stats
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">Class Moved to Room 205</p>
                        <p className="text-sm text-gray-600">
                          Advanced Mathematics
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className="bg-green-100 text-green-700">
                        🏫 Class Update
                      </Badge>
                    </td>
                    <td className="p-3">45 students</td>
                    <td className="p-3">2 days ago</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-yellow-600">
                          Pending (5/45)
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Resend
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Bulk Notification Tools</CardTitle>
          <CardDescription>
            Send notifications to multiple classes or create automated reminders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Users className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <p className="font-medium">All My Students</p>
                <p className="text-xs text-gray-600">Send to all classes</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Clock className="h-6 w-6 text-green-600" />
              <div className="text-center">
                <p className="font-medium">Auto Reminders</p>
                <p className="text-xs text-gray-600">Set up recurring alerts</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <BarChart3 className="h-6 w-6 text-purple-600" />
              <div className="text-center">
                <p className="font-medium">Analytics</p>
                <p className="text-xs text-gray-600">View engagement stats</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function StudentNotificationsPage() {
  return (
    <PortalShell
      title="Student Notifications"
      description="Send notifications and announcements to your students."
    >
      <StudentNotificationsContent />
    </PortalShell>
  );
}
