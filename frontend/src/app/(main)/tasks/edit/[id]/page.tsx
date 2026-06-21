"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import apiRouter from "@/api/router";

export default function EditTaskPage() {
  const params = useParams();

  const router = useRouter();

  const queryClient =
    useQueryClient();

  const taskId = Number(
    params.id
  );

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const {
    data: task,
    isLoading,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () =>
      apiRouter.tasks.getTask(
        taskId
      ),
  });

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCategory(task.category);
      setDueDate(task.due_date);
    }
  }, [task]);

  const updateTaskMutation =
    useMutation({
      mutationFn: () =>
        apiRouter.tasks.updateTask({
          id: taskId,
          title,
          category,
          due_date: dueDate,
          completed:
            task?.completed,
        }),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "task",
            taskId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["progress"],
        });

        router.push("/tasks");
      },

      onError: () => {
        alert(
          "Failed to update task"
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

    updateTaskMutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-red-600">
          Task Not Found
        </h1>
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
          className="space-y-8"
          onSubmit={
            handleSubmit
          }
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
                updateTaskMutation.isPending
              }
              className="rounded-2xl bg-sky-600 px-6 py-4 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateTaskMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}