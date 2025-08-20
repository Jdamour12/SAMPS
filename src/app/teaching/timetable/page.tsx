"use client";

import { PortalShell } from "@/components/portal-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

interface TimetableSession {
  start: string;
  end: string;
  module: string;
  location: string;
  className: string;
}
interface TimetableDay {
  day: string;
  date: string;
  sessions: TimetableSession[];
  color?: string;
}

const timetableData: TimetableDay[] = [
  {
    day: "Monday",
    date: "27-Jan-25",
    color: "bg-red-100",
    sessions: [
      {
        start: "9:00am",
        end: "12:00pm",
        module: "Database Management [COE4261]",
        location: "MUHABURA 0R01",
        className: "Year 3 Information Systems",
      },
    ],
  },
  {
    day: "Tuesday",
    date: "28-Jan-25",
    color: "bg-yellow-100",
    sessions: [
      {
        start: "9:00am",
        end: "12:00pm",
        module: "System Administration [COE4262]",
        location: "SABYINYO B 002",
        className: "Year 4 Computer Engineering",
      },
      {
        start: "2:00pm",
        end: "5:00pm",
        module: "Mathematics for Engineer 2 [MAT1163]",
        location: "AGACIRO 007",
        className: "Year 1 Computer Science",
      },
    ],
  },
  {
    day: "Wednesday",
    date: "29-Jan-25",
    color: "bg-orange-100",
    sessions: [
      {
        start: "9:00am",
        end: "12:00pm",
        module: "Mobile Computing [COE4263]",
        location: "KARISIMBI_Lab CIT 3F-10",
        className: "Year 4 Information Technology",
      },
    ],
  },
  {
    day: "Thursday",
    date: "30-Jan-25",
    color: "bg-green-100",
    sessions: [
      {
        start: "9:00am",
        end: "12:00pm",
        module: "Software Development Lab [COE4265]",
        location: "KARISIMBI_Lab CIT 3F-10",
        className: "Year 4 Computer Science",
      },
    ],
  },
  {
    day: "Friday",
    date: "31-Jan-25",
    color: "bg-blue-100",
    sessions: [
      {
        start: "2:00pm",
        end: "5:00pm",
        module: "Economics Development [SOE4262]",
        location: "MUHABURA 0R07",
        className: "Year 4 Computer Engineering",
      },
    ],
  },
  { day: "Saturday", date: "01-Feb-25", color: "bg-purple-100", sessions: [] },
  { day: "Sunday", date: "02-Feb-25", color: "bg-pink-100", sessions: [] },
];

const timeSlots = [
  "8:00am-9:00am",
  "9:00am-12:00pm",
  "12:00pm-1:00pm",
  "1:00pm-2:00pm",
  "2:00pm-5:00pm",
  "5:00pm-6:00pm",
  "6:00pm-7:00pm",
  "7:00pm-8:00pm",
];

// Replace heroicons with simple SVGs for navigation
const LeftChevron = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);
const RightChevron = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

function TimetableContent() {
  const [weekOffset, setWeekOffset] = useState(0);
  // For demo, just show static week range
  const currentWeekStart = new Date("2025-01-27");
  currentWeekStart.setDate(currentWeekStart.getDate() + weekOffset * 7);
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
  const weekRange = `${currentWeekStart.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })} - ${currentWeekEnd.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })}`;

  return (
    <div className="space-y-6">
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Timetable</CardTitle>
          <CardDescription>
            Your teaching schedule for this week
          </CardDescription>
          <div className="flex items-center gap-2 mt-2">
            <button
              className="p-2 rounded hover:bg-gray-100 border"
              onClick={() => setWeekOffset((w) => w - 1)}
              aria-label="Previous week"
            >
              <LeftChevron />
            </button>
            <span className="font-semibold text-base text-gray-700">
              {weekRange}
            </span>
            <button
              className="p-2 rounded hover:bg-gray-100 border"
              onClick={() => setWeekOffset((w) => w + 1)}
              aria-label="Next week"
            >
              <RightChevron />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm rounded-lg bg-white">
              <thead>
                <tr>
                  <th className="p-2 border text-left">Time</th>
                  {timetableData.map((day) => (
                    <th
                      key={day.day}
                      className="p-2 border text-left font-semibold text-gray-700 bg-white"
                    >
                      {day.day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot}>
                    <td className="p-2 border font-semibold text-gray-600">
                      {slot}
                    </td>
                    {timetableData.map((day) => {
                      // Find session that matches this time slot
                      const session = day.sessions.find(
                        (s) => `${s.start}-${s.end}` === slot
                      );
                      return (
                        <td
                          key={day.day}
                          className="p-2 border align-top bg-white"
                        >
                          {session ? (
                            <div
                              className="rounded px-2 py-1 mb-1 shadow border"
                              style={{
                                background: "#EFF6FF",
                                borderColor: "#BFDBFE",
                              }}
                            >
                              <div className="font-bold text-[#026892]">
                                {session.module}
                              </div>
                              <div className="text-xs text-gray-700">
                                {session.location}
                              </div>
                              <div className="text-xs text-gray-700">
                                {session.className}
                              </div>
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function TimetablePage() {
  return (
    <PortalShell
      title="Timetable"
      description="View your teaching schedule and timetable."
    >
      <TimetableContent />
    </PortalShell>
  );
}
