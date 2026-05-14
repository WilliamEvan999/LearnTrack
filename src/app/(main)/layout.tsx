import Link from "next/link";

export default function mainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <aside className="flex w-64 flex-col bg-slate-900 text-white">

        <div className="border-b border-slate-800 px-6 py-5">
          <h1 className="text-2xl font-bold text-sky-400">
            Learnify
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Learning Tracker
          </p>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">

            <li>
              <Link
                href="/dashboard"
                className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-800"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/courses"
                className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-800"
              >
                Courses
              </Link>
            </li>

            <li>
              <Link
                href="/tasks"
                className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-800"
              >
                Tasks
              </Link>
            </li>

            <li>
              <Link
                href="/progress"
                className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-800"
              >
                Progress
              </Link>
            </li>

            <li>
              <Link
                href="/calendar"
                className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-800"
              >
                Calendar
              </Link>
            </li>

          </ul>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
              Z
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Zierss
              </p>

              <Link
                href="/login"
                className="mt-1 block text-xs text-slate-400 transition hover:text-red-400"
              >
                Logout
              </Link>
            </div>

          </div>
        </div>

      </aside>

      <div className="flex flex-1 flex-col">

        <main className="flex-1 p-8">

          <div className="absolute right-8 top-8">
            <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white">
              ⏱ Start
            </button>
          </div>

          {children}
        </main>

      </div>

    </div>
  );
}