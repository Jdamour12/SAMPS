"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Bell,
  Calendar,
  ChevronRight,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Users,
  ClipboardCheck,
  BarChart3,
  User,
  X,
} from "lucide-react";

// Role-based navigation configuration (copied from academic-portal)
const navigationConfig = {
  lecturer: {
    primary: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        url: "/dashboard",
      },
      {
        title: "Teaching",
        icon: Users,
        items: [
          { title: "My Modules", url: "/teaching/modules" },
          { title: "Teaching Plan", url: "/teaching/plan" },
          { title: "Timetable", url: "/teaching/timetable" },
          { title: "Attendance", url: "/teaching/attendance" },
          { title: "Notify Students", url: "/teaching/notifications" },
        ],
      },
      {
        title: "Students",
        icon: Users,
        items: [
          { title: "Class Lists", url: "/students/lists" },
          { title: "Performance", url: "/students/performance" },
          { title: "Absences", url: "/students/absences" },
          // ...existing code...
          {
            title: "Absence Requests",
            url: "/students/permission-requests",
          },
        ],
      },
      {
        title: "Assessment",
        icon: ClipboardCheck,
        items: [
          { title: "Calendar", url: "/assessment/calendar" },
          { title: "Grades", url: "/assessment/grades" },
          {
            title: "Grades Configuration",
            url: "/assessment/grades-configuration",
          },
          { title: "Results", url: "/students/marks" },
          // The following are hidden from the sidebar UI but remain in config for logic:
          { title: "Moderation", url: "/assessment/moderation", hidden: true },
          { title: "Analysis", url: "/assessment/analysis", hidden: true },
          {
            title: "Grade Entry",
            url: "/assessment/grade-entry",
            hidden: true,
          },
        ],
      },
      {
        title: "Reports",
        icon: BarChart3,
        items: [
          { title: "Teaching Progress", url: "/reports/teaching" },
          { title: "Attendance", url: "/reports/attendance" },
          { title: "Grades", url: "/reports/grades" },
          { title: "Custom Reports", url: "/reports/custom" },
        ],
      },
      {
        title: "Personal",
        icon: User,
        items: [
          { title: "Leave", url: "/personal/leave" },
          { title: "Profile", url: "/personal/profile" },
          { title: "Development", url: "/personal/development" },
          { title: "Internal Comms", url: "/personal/comms" },
        ],
      },
    ],
  },
};

function getExpandedSectionFromPath(pathname: string, navigation: any) {
  if (pathname.startsWith("/teaching/materials/")) {
    return "Teaching";
  }
  // Special logic: If on hidden assessment subpages, keep 'Assessment' expanded and 'Grades' highlighted
  if (
    pathname.startsWith("/assessment/moderation") ||
    pathname.startsWith("/assessment/analysis") ||
    pathname.startsWith("/assessment/grade-entry") ||
    pathname.startsWith("/assessment/examination") ||
    pathname.startsWith("/assessment/create")
  ) {
    return "Assessment";
  }
  for (const item of navigation.primary) {
    if (item.items) {
      for (const subItem of item.items) {
        if (
          pathname === subItem.url ||
          pathname.startsWith(subItem.url + "/")
        ) {
          return item.title;
        }
      }
    } else if (pathname === item.url || pathname.startsWith(item.url + "/")) {
      return item.title;
    }
  }
  return "Dashboard";
}

type PortalShellProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function PortalShell({
  title,
  description,
  children,
}: PortalShellProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "Dashboard"
  );
  const [activeSubItem, setActiveSubItem] = useState<string>("");
  const [currentRole] = useState<string>("lecturer");
  const [notifications] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentNavigation =
    navigationConfig[currentRole as keyof typeof navigationConfig];

  useEffect(() => {
    const shouldBeExpanded = getExpandedSectionFromPath(
      pathname,
      currentNavigation
    );
    setExpandedSection(shouldBeExpanded);

    let activeSubItemUrl = pathname;
    if (pathname.startsWith("/teaching/materials/")) {
      activeSubItemUrl = "/teaching/modules";
      setExpandedSection("Teaching");
    } else if (
      pathname.startsWith("/assessment/moderation") ||
      pathname.startsWith("/assessment/analysis") ||
      pathname.startsWith("/assessment/grade-entry") ||
      pathname.startsWith("/assessment/create") ||
      pathname.startsWith("/assessment/examination")
    ) {
      // Always highlight 'Grades' for these hidden subpages and for create/examination
      activeSubItemUrl = "/assessment/grades";
      setExpandedSection("Assessment");
    } else {
      for (const item of currentNavigation.primary) {
        if (item.items) {
          for (const subItem of item.items) {
            if (pathname.startsWith(subItem.url + "/")) {
              activeSubItemUrl = subItem.url;
              break;
            }
          }
        }
      }
    }
    setActiveSubItem(activeSubItemUrl);
  }, [pathname, currentNavigation]);

  interface LogoutHandler {
    (router: ReturnType<typeof useRouter>): void;
  }

  const handleDropdownLogout: LogoutHandler = (router) => {
    localStorage.removeItem("lecturer_logged_in");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-300">
            <div className="m-auto">
              <img src="/img/logo.jpeg" alt="" className="h-12 w-12" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <nav className="space-y-2">
              {currentNavigation.primary.map((item: any) => (
                <div key={item.title}>
                  {item.items ? (
                    <Collapsible
                      open={expandedSection === item.title}
                      onOpenChange={(isOpen) => {
                        if (isOpen) {
                          setExpandedSection(item.title);
                        } else {
                          if (
                            item.title === "Teaching" &&
                            pathname.startsWith("/teaching/materials/")
                          ) {
                            return;
                          }
                          setExpandedSection("");
                        }
                      }}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-black hover:text-[#026892] hover:bg-[#ECFDF5] data-[state=open]:bg-[#ECFDF5] data-[state=open]:text-[#026892] ${
                            expandedSection === item.title
                              ? "bg-gray-700 text-white"
                              : ""
                          }`}
                        >
                          <item.icon className="mr-3 h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="ml-6 mt-2 space-y-1">
                          {item.items
                            .filter((subItem: any) => !subItem.hidden)
                            .map((subItem: any) => (
                              <Link key={subItem.title} href={subItem.url}>
                                <Button
                                  variant="ghost"
                                  className={`w-full justify-start text-sm hover:text-[#026892] hover:bg-[#ECFDF5] ${
                                    pathname === subItem.url ||
                                    pathname.startsWith(subItem.url + "/") ||
                                    activeSubItem === subItem.url
                                      ? "bg-[#ECFDF5] text-[#026892]"
                                      : "text-gray-700"
                                  }`}
                                  onClick={() => {
                                    setSidebarOpen(false);
                                    setActiveSubItem(subItem.url);
                                    setExpandedSection(item.title);
                                  }}
                                >
                                  <span>{subItem.title}</span>
                                </Button>
                              </Link>
                            ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link href={item.url}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-black hover:text-[#026892] hover:bg-[#ECFDF5] ${
                          pathname === item.url
                            ? "bg-[#ECFDF5] text-[#026892]"
                            : ""
                        }`}
                        onClick={() => {
                          setSidebarOpen(false);
                          setExpandedSection(item.title);
                          setActiveSubItem(item.url);
                        }}
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        <span>{item.title}</span>
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-700 p-4">
            <div className="text-xs text-gray-400 space-y-1">
              <p>Version 2.1.0</p>
              <p>Last Updated: Aug 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50 lg:ml-64">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center">
              <div>
                <span className="font-bold text-[#026892] text-lg">
                  SAMPS UR
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Academic Period Selector */}
            <Select defaultValue="2024-1">
              <SelectTrigger className="w-[160px] border-gray-300">
                <SelectValue placeholder="Academic Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-1">2024 Semester 1</SelectItem>
                <SelectItem value="2024-2">2024 Semester 2</SelectItem>
                <SelectItem value="2023-2">2023 Semester 2</SelectItem>
              </SelectContent>
            </Select>

            {/* Role Switcher */}
            <Select value={currentRole}>
              <SelectTrigger className="w-[120px] border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lecturer">Lecturer</SelectItem>
                <SelectItem value="hod">HOD</SelectItem>
                <SelectItem value="dean">Dean</SelectItem>
                <SelectItem value="dtle">DTLE</SelectItem>
              </SelectContent>
            </Select>

            {/* Global Search */}
            {/* <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-9 w-[250px] border-gray-300 focus:border-[#026892] focus:ring-[#026892]"
              />
            </div> */}

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full pl-1 text-xs bg-red-500 text-white border-2 border-white">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full hover:bg-gray-100"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src="/profile.webp?height=36&width=36"
                      alt="User"
                    />
                    <AvatarFallback className="bg-[#026892]/10 text-[#026892] font-medium">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Dr. John Doe
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      lecturer@gmail.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={() => handleDropdownLogout(router)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Add top padding to push content below fixed header */}
          <div className="p-6 space-y-2 pt-20">
            {/* Page Header - Fixed */}
            <div
              className="sticky top-0 z-30 bg-white flex items-center justify-between py-4 mb-4 border-b border-gray-200"
              style={{ minHeight: "72px" }}
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {title}
                </h1>
                {description && (
                  <p className="text-gray-600 mt-1">{description}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="bg-[#026892] hover:bg-[#026892]/90"
                  size="sm"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button
                  size="sm"
                  className="bg-[#026892] hover:bg-[#026892]/90 text-white"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Quick Report
                </Button>
              </div>
            </div>

            {/* Add padding to push content below fixed header */}
            <div style={{ height: "12px" }} />

            {/* Page Content */}
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-white px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <span className="font-medium">Version 2.1.0</span>
              <span>•</span>
              <a href="#" className="hover:text-blue-600 hover:underline">
                Support
              </a>
              <span>•</span>
              <a href="#" className="hover:text-blue-600 hover:underline">
                Terms
              </a>
              <span>•</span>
              <a href="#" className="hover:text-blue-600 hover:underline">
                Privacy
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span>Last Updated: Aug 2025</span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-gray-600 hover:text-[#026892] hover:bg-[#026892]/10"
              >
                Feedback
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
