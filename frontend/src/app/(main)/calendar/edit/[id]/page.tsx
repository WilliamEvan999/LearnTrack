"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import apiRouter from "@/api/router";

export default function EditCalendarSchedulePage() {
  const params = useParams();

  const router = useRouter();

  const queryClient =
    useQueryClient();

  const scheduleId = Number(
    params.id
  );

  const [title, setTitle] =
    useState("");

  const [
    scheduleDate,
    setScheduleDate,
  ] = useState("");

  const {
    data: schedule,
    isLoading,
  } = useQuery({
    queryKey: [
      "schedule",
      scheduleId,
    ],

    queryFn: () =>
      apiRouter.schedule.getSchedule(
        scheduleId
      ),
  });

  useEffect(() => {
    if (schedule) {
      setTitle(
        schedule.title
      );

      setScheduleDate(
        schedule.schedule_date
      );
    }
  }, [schedule]);

  const updateScheduleMutation =
    useMutation({
      mutationFn: () =>
        apiRouter.schedule.updateSchedule(
          {
            id: scheduleId,
            title,
            schedule_date:
              scheduleDate,
          }
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "schedules",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "schedule",
            scheduleId,
          ],
        });

        router.push(
          "/calendar"
        );
      },

      onError: () => {
        alert(
          "Failed to update schedule"
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

    updateScheduleMutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!schedule) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-red-600">
          Schedule Not Found
        </h1>
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
          Update your schedule.
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
                updateScheduleMutation.isPending
              }
              className="rounded-2xl bg-sky-600 px-6 py-4 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateScheduleMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}