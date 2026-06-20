"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import apiRouter from "@/api/router";

export default function NewCoursePage() {
  const router = useRouter();

  const queryClient =
    useQueryClient();

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const createCourseMutation =
    useMutation({
      mutationFn: () =>
        apiRouter.courses.createCourse({
          title,
          category,
        }),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });

        router.push("/courses");
      },

      onError: () => {
        alert(
          "Failed to create course"
        );
      },
    });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !category.trim()
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    createCourseMutation.mutate();
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900">
          Create New Course
        </h1>

        <p className="mt-2 text-slate-500">
          Add a new course to your learning
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
              Course Name
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="English Speaking"
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
              placeholder="Language"
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-800 outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="/courses"
              className="rounded-2xl border border-slate-300 px-6 py-4 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                createCourseMutation.isPending
              }
              className="rounded-2xl bg-sky-600 px-6 py-4 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createCourseMutation.isPending
                ? "Creating..."
                : "Create Course"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}