"use client";

import Link from "next/link";

import {useParams, useRouter} from "next/navigation";
import { useState } from "react";
import { schedules } from "@/app/data";

export default function EditCalendarSchedulePage() {

  const router = useRouter();

  const params = useParams();

  const Schedule = schedules.find(
    (Schedule) =>
      Schedule.id === Number(params.id)
  );

  const [title, setTitle] =
    useState(Schedule?.title || "");

  const [type, setType] =
    useState(Schedule?.type || "");

  const [date, setDate] =
    useState(Schedule?.date || "");

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const updatedSchedule = {
      id: Schedule?.id,
      title,
      type,
      date,
    };

    console.log(updatedSchedule);

    router.push("/calendar");
  };

  if (!Schedule) {
    return (
      <div className="space-y-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Schedule Not Found
        </h1>

        <Link
          href="/calendar"
          className="inline-flex rounded-2xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700"
        >
          Back to Calendar
        </Link>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <section>

        <h1 className="text-4xl font-bold text-slate-900">
          Edit Schedule
        </h1>

        <p className="mt-2 text-slate-500">
          Update your calendar Schedule.
        </p>

      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="text-sm font-medium text-slate-700">
              Schedule Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700">
              Schedule Type
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500"
            >

              <option value="">
                Select Schedule Type
              </option>

              <option value="Assignment">
                Assignment
              </option>

              <option value="Project">
                Project
              </option>

              <option value="Report">
                Report
              </option>

              <option value="Exam">
                Exam
              </option>

              <option value="Presentation">
                Presentation
              </option>

            </select>

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700">
              Schedule Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-500"
            />

          </div>

          <button
            type="submit"
            className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Save Changes
          </button>

        </form>

      </section>

    </div>
  );
}