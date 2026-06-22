"use client";

import { useQuery } from "@tanstack/react-query";

import apiRouter from "@/api/router";

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
  const {
    data: progress,
    isLoading,
  } = useQuery({
    queryKey: ["progress"],
    queryFn:
      apiRouter.progress.getProgress,
  });

  const {
    data: courses = [],
    isLoading: coursesLoading,
  } = useQuery({
    queryKey: ["courses"],
    queryFn:
      apiRouter.courses.getCourses,
  });

  const formatDuration = (
    totalSeconds: number
  ) => {
    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds =
      totalSeconds % 60;

    let formatted = "";

    if (hours > 0) {
      formatted += `${hours}h `;
    }

    if (minutes > 0 || hours > 0) {
      formatted += `${minutes}m `;
    }

    formatted += `${seconds}s`;

    return formatted;
  };

  const activeCourses = courses
    .filter(
      (course) =>
        (course.progress ?? 0) < 100
    )
    .sort(
      (a, b) =>
        (b.progress ?? 0) -
        (a.progress ?? 0)
    );

  const totalLessons = courses.reduce(
    (total, course) =>
      total +
      (course.lessons?.length ?? 0),
    0
  );

  const completedLessons =
    courses.reduce(
      (total, course) =>
        total +
        (
          course.lessons?.filter(
            (lesson) =>
              lesson.completed
          ).length ?? 0
        ),
      0
    );

  const overallProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessons /
            totalLessons) *
            100
        )
      : 0;

  if (
    isLoading ||
    coursesLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-800">
          Progress
        </h1>

        <p className="mt-2 text-slate-500">
          Track your learning progress and
          study performance.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Courses"
          value={
            progress?.total_courses ?? 0
          }
          icon="📚"
        />

        <StatCard
          title="Completed Courses"
          value={
            progress?.completed_courses ??
            0
          }
          icon="✅"
        />

        <StatCard
          title="Total Tasks"
          value={
            progress?.total_tasks ?? 0
          }
          icon="📝"
        />

        <StatCard
          title="Completed Tasks"
          value={
            progress?.completed_tasks ??
            0
          }
          icon="☑️"
        />

        <StatCard
          title="Total Study Hours"
          value={formatDuration(
            progress?.study_seconds ?? 0
          )}
          icon="⏰"
        />

        <StatCard
          title="Today Study Hours"
          value={formatDuration(
            progress?.today_seconds ?? 0
          )}
          icon="📖"
        />

        <StatCard
          title="Best Streak"
          value={`${
            progress?.best_streak ?? 0
          } Days`}
          icon="🏆"
        />

        <StatCard
          title="Current Streak"
          value={`${
            progress?.current_streak ?? 0
          } Days`}
          icon="🔥"
        />
      </section>

      <Panel title="Overall Progress">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Learning Completion
              </h3>

              <p className="text-sm text-slate-500">
                Combined progress from all
                active courses
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

      <Panel title="Course Progress">
        <div className="space-y-6">
          {activeCourses.length === 0 ? (
            <p className="text-slate-500">
              No active courses
            </p>
          ) : (
            activeCourses.map((course) => (
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
                    {course.progress ?? 0}%
                  </span>
                </div>

                <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-sky-600"
                    style={{
                      width: `${
                        course.progress ?? 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </Panel>

      <Panel title="Study Performance">
        <div className="h-[350px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={
                progress?.study_performance ??
                []
              }
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis
                tickFormatter={(value) =>
                  `${Math.round(
                    value / 3600
                  )}h`
                }
              />

              <Tooltip
                formatter={(value) => [
                  formatDuration(
                    Number(value)
                  ),
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