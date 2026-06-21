"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import apiRouter from "@/api/router";

export default function NewCalendarSchedulePage() {
  const router = useRouter();

  const queryClient =
    useQueryClient();

  const [title, setTitle] =
    useState("");

  const [scheduleDate, setScheduleDate] =
    useState("");

  const createScheduleMutation =
    useMutation({
      mutationFn: () =>
        apiRouter.schedule.createSchedule({
          title,
          schedule_date:
            scheduleDate,
        }),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["schedules"],
        });

        router.push("/calendar");
      },

      onError: () => {
        alert(
          "Failed to create schedule"
        );
      },
    });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !scheduleDate
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    createScheduleMutation.mutate();
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900">
          Create New Schedule
        </h1>

        <p className="mt-2 text-slate-500">
          Add a new schedule to your
          calendar.
        </p>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <form
          className="space-y-8"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-sm font-medium text-slate-700">
              Schedule Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Database Exam"
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-800 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Schedule Date
            </label>

            <input
              type="date"
              value={scheduleDate}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setScheduleDate(
                  e.target.value
                )
              }
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-800 outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="/calendar"
              className="rounded-2xl border border-slate-300 px-6 py-4 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                createScheduleMutation.isPending
              }
              className="rounded-2xl bg-sky-600 px-6 py-4 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createScheduleMutation.isPending
                ? "Creating..."
                : "Create Schedule"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}