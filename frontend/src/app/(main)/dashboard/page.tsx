"use client";

import { useQuery } from "@tanstack/react-query";

import apiRouter from "@/api/router";

import StatCard from "@/app/component/statcard";
import DashboardPanel from "@/app/component/dashboardpanel";

export default function Dashboard() {
  const {
    data: progress,
    isLoading,
  } = useQuery({
    queryKey: ["progress"],
    queryFn: () =>
      apiRouter.progress.getProgress(),
  });

  const {
    data: courses = [],
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      apiRouter.courses.getCourses(),
  });

  const {
    data: tasks = [],
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () =>
      apiRouter.tasks.getTasks(),
  });

  const {
    data: schedules = [],
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: () =>
      apiRouter.schedule.getSchedules(),
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

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const upcomingTasks = tasks
    .filter((task) => {
      if (!task.due_date) {
        return false;
      }

      return (
        !task.completed &&
        new Date(task.due_date) >= today
      );
    })
    .sort(
      (a, b) =>
        new Date(a.due_date ?? "").getTime() -
        new Date(b.due_date ?? "").getTime()
    )
    .slice(0, 3);

  const upcomingSchedules = schedules
    .filter((schedule) => {
      if (!schedule.schedule_date) {
        return false;
      }

      return (
        new Date(schedule.schedule_date) >=
        today
      );
    })
    .sort(
      (a, b) =>
        new Date(
          a.schedule_date ?? ""
        ).getTime() -
        new Date(
          b.schedule_date ?? ""
        ).getTime()
    )
    .slice(0, 3);

  const activeCourses = courses
    .filter(
      (course) =>
        (course.progress ?? 0) < 100
    )
    .sort(
      (a, b) =>
        (b.progress ?? 0) -
        (a.progress ?? 0)
    )
    .slice(0, 3);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Ready to continue your learning journey today?
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Courses"
          value={progress?.total_courses ?? 0}
          icon="📚"
        />

        <StatCard
          title="Total Tasks"
          value={
            progress?.total_tasks ?? 0
          }
          icon="📝"
        />

        <StatCard
          title="Today Study Hours"
          value={formatDuration(
            progress?.today_seconds ?? 0
          )}
          icon="📖"
        />

        <StatCard
          title="Current Streak"
          value={`${
            progress?.current_streak ?? 0
          } Days`}
          icon="🔥"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <DashboardPanel
          title="Uncompleted Tasks"
          href="/tasks"
        >
          {upcomingTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
              No uncompleted tasks
            </div>
          ) : (
            upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-orange-200 bg-orange-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    {task.title}
                  </h3>

                  <span className="rounded-lg bg-orange-100 px-2 py-1 text-xs text-orange-600">
                    {task.due_date}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {task.category}
                </p>
              </div>
            ))
          )}
        </DashboardPanel>

        <DashboardPanel
          title="Upcoming Schedule"
          href="/calendar"
        >
          {upcomingSchedules.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
              No upcoming schedules
            </div>
          ) : (
            upcomingSchedules.map(
              (schedule) => (
                <div
                  key={schedule.id}
                  className="rounded-xl border border-sky-200 bg-sky-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">
                      {schedule.title}
                    </h3>

                    <span className="rounded-lg bg-sky-100 px-2 py-1 text-xs text-sky-600">
                      {
                        schedule.schedule_date
                      }
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Scheduled Activity
                  </p>
                </div>
              )
            )
          )}
        </DashboardPanel>
      </section>

      <DashboardPanel
        title="Active Courses"
        href="/courses"
      >
        {activeCourses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            No active courses
          </div>
        ) : (
          activeCourses.map((course) => (
            <div key={course.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {course.category} •{" "}
                    {course.lessons?.length ?? 0}{" "}
                    Lessons
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
      </DashboardPanel>
    </div>
  );
}