"use client";

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import CourseCard from "@/app/component/coursecard";
import Filter from "@/app/component/filter";
import apiRouter from "@/api/router";

export default function CoursesPage() {
  const [activeTab, setActiveTab] =
    useState("progress");

  const queryClient = useQueryClient();

  const { data: courses = [], isLoading} = useQuery({
    queryKey: ["courses"],
    queryFn: apiRouter.courses.getCourses,
  });

  const deleteCourseMutation =
    useMutation({
      mutationFn:
        apiRouter.courses.deleteCourse,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });
      },

      onError: () => {
        alert(
          "Failed to delete course"
        );
      },
    });

  const filteredCourses =
    courses.filter((course) =>
      activeTab === "progress"
        ? (course.progress ?? 0) < 100
        : (course.progress ?? 0) === 100
    );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-800">
          Courses
        </h1>

        <p className="mt-2 text-slate-500">
          Continue your learning journey.
        </p>
      </section>

      <Filter
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map(
          (course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={
                course.title ?? ""
              }
              category={
                course.category ?? ""
              }
              lessons={
                course.lessons_count ??
                0
              }
              progress={
                course.progress ?? 0
              }
              onDelete={() =>
                deleteCourseMutation.mutate(
                  course.id
                )
              }
            />
          )
        )}
      </section>

      <a
        href="/courses/new"
        className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-600 text-4xl text-white shadow-lg transition hover:bg-sky-700"
      >
        +
      </a>
    </div>
  );
}