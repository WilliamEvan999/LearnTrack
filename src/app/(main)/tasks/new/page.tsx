"use client";

import { useState } from "react";

export default function NewTaskPage() {

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");

  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      title,
      category,
      dueDate,
      completed: false,
    };

    console.log(newTask);

    setTitle("");
    setCategory("");
    setDueDate("");
  };

  return (
    <div className="space-y-8">

      <section>

        <h1 className="text-4xl font-bold text-slate-900">
          Create New Task
        </h1>

        <p className="mt-2 text-slate-500">
          Add a new study task to your tracker.
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
              placeholder="Complete React assignment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700">
              Category
            </label>

            <input
              type="text"
              placeholder="Programming"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500"
            />

          </div>

          <button
            type="submit"
            className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Create Task
          </button>

        </form>

      </section>

    </div>
  );
}