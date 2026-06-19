"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiRouter from "@/api/router";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] =
    useState(true);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser =
          await apiRouter.users.me();

        setUser(currentUser.user);
        setIsLoading(false);
      } catch {
        localStorage.removeItem(
          "token"
        );

        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    router.push("/login");
  };

  if (isLoading) {
    return null;
  }

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

            <li>
              <Link
                href="/sessions"
                className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-800"
              >
                Sessions
              </Link>
            </li>
          </ul>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {user?.name}
              </p>

              <button
                onClick={handleLogout}
                className="mt-1 block text-xs text-slate-400 transition hover:text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}