"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { courses } from "@/app/data";

export default function EditCoursePage() {

  const params = useParams();

  const courseId = Number(params.id);

  const selectedCourse =
    courses.find(
      (course) => course.id === courseId
    );

  const [courseName, setCourseName] =
    useState(
      selectedCourse?.title || ""
    );

  const [category, setCategory] =
    useState(
      selectedCourse?.category || ""
    );

  const [sessions, setSessions] =
    useState(
      selectedCourse?.sessions || []
    );

  const addSession = () => {

    setSessions([
      ...sessions,

      {
        title: "",
        completed: false,
      },
    ]);

  };

  const removeSession = (
    index: number
  ) => {

    const updatedSessions =
      [...sessions];

    updatedSessions.splice(index, 1);

    setSessions(updatedSessions);

  };

  const updateSession = (
    index: number,
    value: string
  ) => {

    const updatedSessions =
      [...sessions];

    updatedSessions[index].title =
      value;

    setSessions(updatedSessions);

  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const updatedCourse = {

      id: courseId,

      title: courseName,

      category,

      sessions,
    };

    console.log(updatedCourse);

  };

  if (!selectedCourse) {

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
          Update your course data.
        </p>

      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <div>

            <label className="text-sm font-medium text-slate-700">
              Course Name
            </label>

            <input
              type="text"
              value={courseName}
              onChange={(e) =>
                setCourseName(
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

            <div className="flex items-center justify-between">

              <label className="text-sm font-medium text-slate-700">
                Course Sessions
              </label>

              <button
                type="button"
                onClick={addSession}
                className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
              >
                + Add Session
              </button>

            </div>

            <div className="mt-4 space-y-4">

              {sessions.map(
                (session, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >

                    <input
                      type="text"
                      value={session.title}
                      onChange={(e) =>
                        updateSession(
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Session ${index + 1}`}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-800 outline-none focus:border-sky-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeSession(
                          index
                        )
                      }
                      className="rounded-2xl bg-red-100 px-4 py-4 text-red-600 transition hover:bg-red-200"
                    >
                      ✕
                    </button>

                  </div>

                )
              )}

            </div>

          </div>

          <button
            type="submit"
            className="rounded-2xl bg-sky-600 px-6 py-4 font-medium text-white transition hover:bg-sky-700"
          >
            Save Changes
          </button>

        </form>

      </section>

    </div>
  );
}