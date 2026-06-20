"use client";

import { useState } from "react";

export default function NewCoursePage() {

  const [sessions, setSessions] =
    useState([""]);

  const addSession = () => {

    setSessions([
      ...sessions,
      "",
    ]);

  };

  const removeSession = (index: number) => {

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

    updatedSessions[index] = value;

    setSessions(updatedSessions);

  };

  return (
    <div className="space-y-8">

      <section>

        <h1 className="text-4xl font-bold text-slate-900">
          Create New Course
        </h1>

        <p className="mt-2 text-slate-500">
          Add a new course to your learning tracker.
        </p>

      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <form className="space-y-8">

          <div>

            <label className="text-sm font-medium text-slate-700">
              Course Name
            </label>

            <input
              type="text"
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
              placeholder="Language"
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

              {sessions.map((session, index) => (

                <div
                  key={index}
                  className="flex items-center gap-3"
                >

                  <input
                    type="text"
                    value={session}
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
                    onClick={() => removeSession(index)}
                    className="rounded-2xl bg-red-100 px-4 py-4 text-red-600 transition hover:bg-red-200"
                  >
                    ✕
                  </button>

                </div>

              ))}

            </div>

          </div>

          <button
            type="submit"
            className="rounded-2xl bg-sky-600 px-6 py-4 font-medium text-white transition hover:bg-sky-700"
          >
            Create Course
          </button>

        </form>

      </section>

    </div>
  );
}