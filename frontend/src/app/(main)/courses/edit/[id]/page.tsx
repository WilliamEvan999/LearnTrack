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

export default function EditCoursePage() {
  const params = useParams();

  const router = useRouter();

  const queryClient =
    useQueryClient();

  const courseId = Number(
    params.id
  );

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const {
    data: course,
    isLoading,
  } = useQuery({
    queryKey: [
      "course",
      courseId,
    ],
    queryFn: () =>
      apiRouter.courses.getCourse(
        courseId
      ),
  });

  useEffect(() => {
    if (course) {
      setTitle(
        course.title ?? ""
      );

      setCategory(
        course.category ?? ""
      );
    }
  }, [course]);

  const updateCourseMutation =
    useMutation({
      mutationFn: () =>
        apiRouter.courses.updateCourse({
          id: courseId,
          title,
          category,
        }),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "courses",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "course",
            courseId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "progress",
          ],
        });

        router.push(
          "/courses"
        );
      },

      onError: () => {
        alert(
          "Failed to update course"
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

    updateCourseMutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-red-600">
          Course Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900">
          Edit Course
        </h1>

        <p className="mt-2 text-slate-500">
          Update your course
          information.
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
              Course Name
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
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
                updateCourseMutation.isPending
              }
              className="rounded-2xl bg-sky-600 px-6 py-4 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateCourseMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}