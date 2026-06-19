"use client";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { useState } from "react";

import { tasks } from "@/app/data";

export default function EditTaskPage() {

  const router = useRouter();

  const params = useParams();

  const task = tasks.find(
    (task) =>
      task.id === Number(params.id)
  );

  const [title, setTitle] =
    useState(task?.title || "");

  const [category, setCategory] =
    useState(task?.course || "");

  const [dueDate, setDueDate] =
    useState(task?.dueDate || "");

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const updatedTask = {
      id: task?.id,
      title,
      category,
      dueDate,
    };

    console.log(updatedTask);

    router.push("/tasks");
  };

  if (!task) {
    return (
      <div className="space-y-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Task Not Found
        </h1>

        <Link
          href="/tasks"
          className="inline-flex rounded-2xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700"
        >
          Back to Tasks
        </Link>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <section>

        <h1 className="text-4xl font-bold text-slate-900">
          Edit Task
        </h1>

        <p className="mt-2 text-slate-500">
          Update your study task.
        </p>

      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="text-sm font-medium text-slate-700">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500"
            />

          </div>

          <button
            type="submit"
            className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Save Changes
          </button>

        </form>

      </section>

    </div>
  );
}