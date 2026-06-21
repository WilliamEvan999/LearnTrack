"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import PanelCard from "@/app/component/panelcard";
import CardActions from "@/app/component/actioncard";
import apiRouter from "@/api/router";

export default function CalendarPage() {
  const [date, setDate] =
    useState(new Date());

  const queryClient =
    useQueryClient();

  const {
    data: schedules = [],
    isLoading:
      schedulesLoading,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn:
      apiRouter.schedule.getSchedules,
  });

  const {
    data: tasks = [],
    isLoading: tasksLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn:
      apiRouter.tasks.getTasks,
  });

  const deleteScheduleMutation =
    useMutation({
      mutationFn:
        apiRouter.schedule.deleteSchedule,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["schedules"],
        });
      },

      onError: () => {
        alert(
          "Failed to delete schedule"
        );
      },
    });

  const formatDate = (
    date: Date
  ) => {
    const year =
      date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const deleteSchedule = (
    id: number
  ) => {
    deleteScheduleMutation.mutate(
      id
    );
  };

  const selectedMonth =
    date.getMonth();

  const selectedYear =
    date.getFullYear();

  const filteredEvents =
    schedules
      .filter((schedule) => {
        const [year, month] =
          schedule.schedule_date
            .split("-")
            .map(Number);

        return (
          month - 1 ===
            selectedMonth &&
          year === selectedYear
        );
      })
      .sort(
        (a, b) =>
          new Date(
            a.schedule_date
          ).getTime() -
          new Date(
            b.schedule_date
          ).getTime()
      );

  const filteredTasks =
    tasks
      .filter((task) => {
        const [year, month] =
          task.due_date
            .split("-")
            .map(Number);

        return (
          !task.completed &&
          month - 1 ===
            selectedMonth &&
          year === selectedYear
        );
      })
      .sort(
        (a, b) =>
          new Date(
            a.due_date
          ).getTime() -
          new Date(
            b.due_date
          ).getTime()
      );

  if (
    schedulesLoading ||
    tasksLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-800">
          Calendar
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your study schedule.
        </p>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            text-black

            [&_.react-calendar]:!w-full
            [&_.react-calendar__viewContainer]:w-full
            [&_.react-calendar]:border-0
            [&_.react-calendar]:font-sans

            [&_.react-calendar__navigation]:mb-6

            [&_.react-calendar__navigation_button]:rounded-lg
            [&_.react-calendar__navigation_button]:font-semibold
            [&_.react-calendar__navigation_button]:text-slate-800
            [&_.react-calendar__navigation_button]:transition
            [&_.react-calendar__navigation_button]:hover:bg-slate-100

            [&_.react-calendar__month-view__weekdays]:mb-2
            [&_.react-calendar__month-view__weekdays]:text-xs
            [&_.react-calendar__month-view__weekdays]:font-bold
            [&_.react-calendar__month-view__weekdays]:uppercase
            [&_.react-calendar__month-view__weekdays]:text-slate-500

            [&_.react-calendar__month-view__weekdays__weekday]:p-3

            [&_.react-calendar__tile]:h-24
            [&_.react-calendar__tile]:rounded-xl
            [&_.react-calendar__tile]:text-base
            [&_.react-calendar__tile]:font-medium
            [&_.react-calendar__tile]:text-slate-700
            [&_.react-calendar__tile]:transition
            [&_.react-calendar__tile]:hover:bg-sky-100

            [&_.react-calendar__tile--active]:!bg-sky-600
            [&_.react-calendar__tile--active]:!text-white

            [&_.react-calendar__month-view__days__day--neighboringMonth]:text-slate-300

            [&_.react-calendar__month-view__days__day--weekend]:text-red-500
          "
        >
          <Calendar
            value={date}
            onChange={(value) =>
              setDate(value as Date)
            }
            onActiveStartDateChange={({
              activeStartDate,
            }) => {
              if (activeStartDate) {
                setDate(activeStartDate);
              }
            }}
            tileContent={({
              date,
              view,
            }) => {
              if (view !== "month") {
                return null;
              }

              const currentDate =
                formatDate(date);

              const hasSchedule =
                schedules.some(
                  (schedule) =>
                    schedule.schedule_date ===
                    currentDate
                );

              const hasTask = tasks.some(
                (task) =>
                  !task.completed &&
                  task.due_date === currentDate
              );

              if (
                !hasSchedule &&
                !hasTask
              ) {
                return null;
              }

              return (
                <div className="mt-1 flex justify-center gap-1">
                  {hasSchedule && (
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                  )}

                  {hasTask && (
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                  )}
                </div>
              );
            }}
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <PanelCard
          title="Upcoming Schedule"
        >
          {filteredEvents.length ===
          0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
              No events this month
            </div>
          ) : (
            filteredEvents.map(
              (schedule) => (
                <div
                  key={schedule.id}
                  className="rounded-xl border border-red-200 bg-red-50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-800">
                          {schedule.title}
                        </h3>

                        <span className="rounded-lg bg-red-100 px-2 py-1 text-xs text-red-600">
                          {
                            schedule.schedule_date
                          }
                        </span>
                      </div>
                    </div>

                    <CardActions
                      editHref={`/calendar/edit/${schedule.id}`}
                      onDelete={() =>
                        deleteSchedule(
                          schedule.id
                        )
                      }
                    />
                  </div>
                </div>
              )
            )
          )}
        </PanelCard>

        <PanelCard title="Task Deadlines">
          {filteredTasks.length ===
          0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
              No task deadlines this month
            </div>
          ) : (
            filteredTasks.map(
              (task) => (
                <div
                  key={task.id}
                  className="rounded-xl border border-orange-200 bg-orange-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">
                      {task.title}
                    </h3>

                    <span className="rounded-lg bg-orange-100 px-2 py-1 text-xs text-orange-700">
                      {task.due_date}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {task.category}
                  </p>
                </div>
              )
            )
          )}
        </PanelCard>
      </section>

      <Link
        href="/calendar/new"
        className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-600 text-4xl text-white shadow-lg transition hover:bg-sky-700"
      >
        +
      </Link>
    </div>
  );
}