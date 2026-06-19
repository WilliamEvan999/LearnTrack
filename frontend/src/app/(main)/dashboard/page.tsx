import {user, stats, courses, tasks, schedules} from "@/app/data";
import StatCard from "@/app/component/statcard";
import DashboardPanel from "@/app/component/dashboardpanel";

export default function Dashboard() {

  const totalCourses = stats.find(
    (stat) => stat.type === "courses"
  );

  const completedTasks = stats.find(
    (stat) => stat.type === "completed-tasks"
  );

  const studyHours = stats.find(
    (stat) => stat.type === "study-hours"
  );

  const currentStreak = stats.find(
    (stat) => stat.type === "current-streak"
  );

  return (
    <div className="space-y-8">

      <section>

        <h1 className="text-3xl font-bold text-slate-800">
          Hello, {user.name}
        </h1>

        <p className="mt-2 text-slate-500">
          Ready to continue your learning journey today?
        </p>

      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title={totalCourses?.title || ""}
          value={totalCourses?.value || ""}
          icon="📚"
        />

        <StatCard
          title={completedTasks?.title || ""}
          value={completedTasks?.value || ""}
          icon="✅"
        />

        <StatCard
          title={studyHours?.title || ""}
          value={studyHours?.value || ""}
          icon="⏰"
        />

        <StatCard
          title={currentStreak?.title || ""}
          value={currentStreak?.value || ""}
          icon="🔥"
        />

      </section>

      <section className="grid gap-6 lg:grid-cols-2">

        <DashboardPanel
          title="Uncompleted Tasks"
          href="/tasks"
        >

          {tasks
            .filter((task) => !task.completed)
            .slice(0, 3)
            .map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-orange-200 bg-orange-50 p-4"
              >

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-slate-800">
                    {task.title}
                  </h3>

                  <span className="rounded-lg bg-orange-100 px-2 py-1 text-xs text-orange-600">
                    {task.dueDate}
                  </span>

                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {task.course}
                </p>

              </div>
            ))}

        </DashboardPanel>

        <DashboardPanel
          title="Upcoming Schedule"
          href="/calendar"
        >

          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="rounded-xl border border-sky-200 bg-sky-50 p-4"
            >

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-slate-800">
                  {schedule.title}
                </h3>

                <span className="rounded-lg bg-sky-100 px-2 py-1 text-xs text-sky-600">
                  {schedule.date}
                </span>

              </div>

              <p className="mt-2 text-sm text-slate-500">
                {schedule.type}
              </p>

            </div>
          ))}

        </DashboardPanel>

      </section>

      <DashboardPanel
        title="Active Courses"
        href="/courses"
      >

        {courses
          .filter((course) => course.progress < 100)
          .slice(0, 3)
          .map((course) => (
            <div key={course.id}>

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {course.category} • {course.lessons} Sessions
                  </p>

                </div>

                <span className="text-sm font-semibold text-sky-700">
                  {course.progress}%
                </span>

              </div>

              <div className="mt-3 h-2 w-full rounded-full bg-slate-200">

                <div
                  className="h-2 rounded-full bg-sky-600"
                  style={{
                    width: `${course.progress}%`,
                  }}
                />

              </div>

            </div>
          ))}

      </DashboardPanel>

    </div>
  );
}