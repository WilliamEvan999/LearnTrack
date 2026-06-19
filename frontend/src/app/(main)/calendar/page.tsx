"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {schedules as initialSchedules, tasks} from "@/app/data";
import PanelCard from "@/app/component/panelcard";
import CardActions from "@/app/component/actioncard";

export default function CalendarPage() {

  const [date, setDate] =
    useState<Date | null>(null);

  const [schedules, setSchedules] =
    useState(initialSchedules);

  useEffect(() => {
    setDate(new Date());
  }, []);

  if (!date) {
    return null;
  }

  const deleteSchedule = (
    id: number
  ) => {

    setSchedules((prevSchedules) =>
      prevSchedules.filter(
        (schedule) =>
          schedule.id !== id
      )
    );
  };

  const selectedMonth =
    date.getMonth();

  const selectedYear =
    date.getFullYear();

  const filteredEvents =
    schedules.filter(
      (schedule) => {

        const [year, month] =
          schedule.date
            .split("-")
            .map(Number);

        return (
          month - 1 ===
            selectedMonth &&
          year === selectedYear
        );
      }
    );

  const filteredTasks =
    tasks.filter(
      (task) => {

        const [year, month] =
          task.dueDate
            .split("-")
            .map(Number);

        return (
          !task.completed &&
          month - 1 ===
            selectedMonth &&
          year === selectedYear
        );
      }
    );

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Calendar
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your study schedule.
        </p>

      </div>

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
            [&_.react-calendar__navigation_button]:text-slate-800
            [&_.react-calendar__navigation_button]:font-semibold
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
            onChange={(value) =>
              setDate(value as Date)
            }
            onActiveStartDateChange={({
              activeStartDate,
            }) => {
              if (
                activeStartDate
              ) {
                setDate(
                  activeStartDate
                );
              }
            }}
            value={date}
          />

        </div>

      </section>

      <section className="grid gap-6 lg:grid-cols-2">

        <PanelCard
          title="Upcoming Schedule"
        >

          {filteredEvents.length >
          0 ? (
            filteredEvents
              .slice(0, 3)
              .map((schedule) => (
                <div
                  key={schedule.id}
                  className="rounded-xl border border-red-200 bg-red-50 p-4"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex-1">

                      <div className="flex items-center justify-between gap-4">

                        <h3 className="font-semibold text-slate-800">
                          {
                            schedule.title
                          }
                        </h3>

                        <span className="rounded-lg bg-red-100 px-2 py-1 text-xs text-red-600">
                          {
                            schedule.date
                          }
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {
                          schedule.type
                        }
                      </p>

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
              ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
              No events this month
            </div>
          )}

        </PanelCard>

        <PanelCard
          title="Task Deadlines"
        >

          {filteredTasks.length >
          0 ? (
            filteredTasks
              .slice(0, 3)
              .map((task) => (
                <div
                  key={task.id}
                  className="rounded-xl border border-orange-200 bg-orange-50 p-4"
                >

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-slate-800">
                      {task.title}
                    </h3>

                    <span className="rounded-lg bg-orange-100 px-2 py-1 text-xs text-orange-700">
                      {
                        task.dueDate
                      }
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {task.course}
                  </p>

                </div>
              ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
              No task deadlines this month
            </div>
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