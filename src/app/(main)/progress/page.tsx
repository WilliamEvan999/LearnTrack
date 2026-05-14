"use client";

import {courses, stats, studyPerformance} from "@/app/data";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Panel from "@/app/component/panelcard";
import StatCard from "@/app/component/statcard";

export default function ProgressPage() {

  const activeCourses = courses.filter(
    (course) => course.progress < 100
  );

  const overallProgress = Math.round(
    activeCourses.reduce(
      (total, course) => total + course.progress,
      0
    ) / activeCourses.length
  );

  const statIcons: Record<string, string> = {
    courses: "📚",
    "completed-courses": "✅",
    "total-tasks": "📝",
    "completed-tasks": "☑️",
    "study-hours": "⏰",
    "today-hours": "📖",
    "best-streak": "🏆",
    "current-streak": "🔥",
  };

  return (
    <div className="space-y-8">

      <section>

        <h1 className="text-3xl font-bold text-slate-900">
          Progress
        </h1>

        <p className="mt-2 text-slate-500">
          Track your learning progress and study performance.
        </p>

      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={statIcons[stat.type]}
          />
        ))}

      </section>

      <Panel
        title="Overall Progress"
      >

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-lg font-semibold text-slate-800">
                Learning Completion
              </h3>

              <p className="text-sm text-slate-500">
                Combined progress from all active courses
              </p>

            </div>

            <span className="text-3xl font-bold text-sky-700">
              {overallProgress}%
            </span>

          </div>

          <div className="h-4 w-full rounded-full bg-slate-200">

            <div
              className="h-4 rounded-full bg-sky-600 transition-all"
              style={{
                width: `${overallProgress}%`,
              }}
            />

          </div>

        </div>

      </Panel>

      <Panel
        title="Course Progress"
      >

        <div className="space-y-6">

          {activeCourses.map((course) => (
            <div key={course.id}>

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {course.category}
                  </p>

                </div>

                <span className="text-sm font-semibold text-sky-700">
                  {course.progress}%
                </span>

              </div>

              <div className="mt-3 h-2 w-full rounded-full bg-slate-200">

                <div
                  className={`h-2 rounded-full ${
                    course.progress === 100
                      ? "bg-emerald-500"
                      : "bg-sky-600"
                  }`}
                  style={{
                    width: `${course.progress}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </Panel>

      <Panel
        title="Study Performance"
      >

        <div className="h-[350px] w-full">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={studyPerformance}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip
                formatter={(value, name, props) => [
                  props.payload.label,
                  "Study Time",
                ]}
              />

              <Line
                type="monotone"
                dataKey="seconds"
                stroke="#0284c7"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </Panel>

    </div>
  );
}