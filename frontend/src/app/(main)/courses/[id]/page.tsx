"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { courses } from "@/app/data";

type Session = {
  title: string;
  completed: boolean;
};

type Course = {
  id: number;
  title: string;
  progress: number;
  lessons: number;
  category: string;
  sessions: Session[];
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function Page({
  params,
}: PageProps) {

  const [course, setCourse] =
    useState<Course | null>(null);

  useEffect(() => {

    const loadCourse = async () => {

      const { id } = await params;

      const foundCourse = courses.find(
        (course) => course.id.toString() === id
      );

      if (!foundCourse) {
        notFound();
      }

      setCourse(foundCourse);

    };

    loadCourse();

  }, [params]);

  if (!course) {
    return null;
  }

  const toggleSession = (index: number) => {

    const updatedSessions =
      [...course.sessions];

    updatedSessions[index].completed =
      !updatedSessions[index].completed;

    const completedSessions =
      updatedSessions.filter(
        (session) => session.completed
      ).length;

    const progress = Math.round(
      (completedSessions / updatedSessions.length) * 100
    );

    setCourse({
      ...course,
      sessions: updatedSessions,
      progress,
    });

  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
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
            {course.progress}%
          </span>

        </div>

        <p className="mt-6 text-slate-500">
          {course.lessons} learning sessions available.
        </p>
        
        <div className="mt-6 h-3 w-full rounded-full bg-slate-200">

          <div
            className="h-3 rounded-full bg-sky-600 transition-all duration-300"
            style={{
              width: `${course.progress}%`,
            }}
          />

        </div>

      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-bold text-slate-800">
          Course Content
        </h2>

        <div className="mt-6 space-y-4">

          {course.sessions.map((session, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 text-slate-800"
            >

              <span>
                {session.title}
              </span>

              <button
                onClick={() => toggleSession(index)}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                  session.completed
                    ? "border-sky-600 bg-sky-600 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {session.completed && "✓"}
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}