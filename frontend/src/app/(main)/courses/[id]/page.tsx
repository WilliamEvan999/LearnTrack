"use client";

import { use } from "react";
import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import Link from "next/link";

import apiRouter from "@/api/router";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function Page({
  params,
}: PageProps) {
  const { id } = use(params);

  const queryClient =
    useQueryClient();

  const [newLesson, setNewLesson] =
    useState("");

  const {
    data: course,
    isLoading,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: () =>
      apiRouter.courses.getCourse(
        Number(id)
      ),
  });

  const refreshCourseData = () => {
    queryClient.invalidateQueries({
      queryKey: ["course", id],
    });

    queryClient.invalidateQueries({
      queryKey: ["courses"],
    });

    queryClient.invalidateQueries({
      queryKey: ["progress"],
    });
  };

  const updateLessonMutation =
    useMutation({
      mutationFn:
        apiRouter.lessons.updateLesson,

      onSuccess: refreshCourseData,
    });

  const createLessonMutation =
    useMutation({
      mutationFn:
        apiRouter.lessons.createLesson,

      onSuccess: () => {
        setNewLesson("");

        refreshCourseData();
      },
    });

  const deleteLessonMutation =
    useMutation({
      mutationFn:
        apiRouter.lessons.deleteLesson,

      onSuccess: refreshCourseData,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    notFound();
  }

  const toggleLesson = (
    lesson: {
      id?: number;
      title?: string;
      course_id?: number;
      completed?: boolean;
    }
  ) => {
    updateLessonMutation.mutate({
      id: lesson.id,
      title: lesson.title,
      course_id: lesson.course_id,
      completed: !lesson.completed,
    });
  };

  
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-sky-600">
              {course.category}
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              {course.title}
            </h1>
          </div>

          <span className="rounded-2xl bg-sky-100 px-4 py-2 text-lg font-semibold text-sky-700">
            {course.progress ?? 0}%
          </span>
        </div>

        <p className="mt-6 text-slate-500">
          {course.lessons_count ?? 0} learning
          sessions available.
        </p>

        <div className="mt-6 h-3 w-full rounded-full bg-slate-200">
          <div
            className="h-3 rounded-full bg-sky-600 transition-all duration-300"
            style={{
              width: `${course.progress ?? 0}%`,
            }}
          />
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            Course Content
          </h2>
        </div>

        <div className="mt-6 flex gap-3">
          <input
            type="text"
            value={newLesson}
            onChange={(e) =>
              setNewLesson(
                e.target.value
              )
            }
            placeholder="New Lesson"
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />

          <button
            type="button"
            disabled={
              createLessonMutation.isPending
            }
            onClick={() => {
              if (!newLesson.trim()) {
                return;
              }

              createLessonMutation.mutate({
                title: newLesson,
                course_id: Number(id),
                completed: false,
              });
            }}
            className="rounded-2xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createLessonMutation.isPending
              ? "Adding..."
              : "Add Lesson"}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {course.lessons?.length ===
          0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-400">
              No lessons yet
            </div>
          ) : (
            course.lessons?.map(
              (lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <span>
                      {lesson.title}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        deleteLessonMutation.mutate(
                          lesson.id!
                        )
                      }
                      className="rounded-lg px-2 py-1 text-red-500 transition hover:bg-red-50"
                    >
                      ✕
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      toggleLesson(
                        lesson
                      )
                    }
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                      lesson.completed
                        ? "border-sky-600 bg-sky-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {lesson.completed &&
                      "✓"}
                  </button>
                </div>
              )
            )
          )}
        </div>
      </section>

      <div className="flex justify-start">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700"
        >
         Back to Courses
        </Link>
      </div>
    </div>
  );
}