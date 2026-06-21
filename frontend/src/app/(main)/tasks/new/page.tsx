"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import apiRouter from "@/api/router";

export default function NewTaskPage() {
  const router = useRouter();

  const queryClient =
    useQueryClient();

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const createTaskMutation =
    useMutation({
      mutationFn: () =>
        apiRouter.tasks.createTask({
          title,
          category,
          due_date: dueDate,
          completed: false,
        }),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });

        queryClient.invalidateQueries({
          queryKey: ["progress"],
        });

        router.push("/tasks");
      },

      onError: () => {
        alert(
          "Failed to create task"
        );
      },
    });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !category.trim() ||
      !dueDate
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    createTaskMutation.mutate();
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900">
          Create New Task
        </h1>

        <p className="mt-2 text-slate-500">
          Add a new study task to your
          tracker.
        </p>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <form
          className="space-y-8"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-sm font-medium text-slate-700">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Complete React assignment"
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-800 outline-none focus:border-sky-500"
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
                setCategory(
                  e.target.value
                )
              }
              placeholder="Programming"
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-800 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-800 outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="/tasks"
              className="rounded-2xl border border-slate-300 px-6 py-4 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                createTaskMutation.isPending
              }
              className="rounded-2xl bg-sky-600 px-6 py-4 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createTaskMutation.isPending
                ? "Creating..."
                : "Create Task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}