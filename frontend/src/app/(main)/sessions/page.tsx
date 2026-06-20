"use client";

import { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import PanelCard from "@/app/component/panelcard";
import CardActions from "@/app/component/actioncard";
import TimerButton from "@/app/component/timerbutton";
import apiRouter from "@/api/router";

export default function SessionsPage() {
  const [description, setDescription] =
    useState("");

  const [seconds, setSeconds] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [startTime, setStartTime] =
    useState<Date | null>(null);

  const queryClient =
    useQueryClient();

  const {
    data: sessions = [],
    isLoading,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn:
      apiRouter.studySession.getStudySessions,
  });

  const createSessionMutation =
    useMutation({
      mutationFn:
        apiRouter.studySession.createStudySession,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["sessions"],
        });

        queryClient.invalidateQueries({
          queryKey: ["progress"],
        });
      },

      onError: () => {
        alert(
          "Failed to create session"
        );
      },
    });

  const deleteSessionMutation =
    useMutation({
      mutationFn:
        apiRouter.studySession.deleteStudySession,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["sessions"],
        });

        queryClient.invalidateQueries({
          queryKey: ["progress"],
        });
      },

      onError: () => {
        alert(
          "Failed to delete session"
        );
      },
    });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(
          (prev) => prev + 1
        );
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const formatTime = (
    totalSeconds: number
  ) => {
    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const secs =
      totalSeconds % 60;

    return [
      hours,
      minutes,
      secs,
    ]
      .map((num) =>
        num
          .toString()
          .padStart(2, "0")
      )
      .join(":");
  };

  const formatDuration = (
    totalSeconds: number
  ) => {
    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const secs =
      totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }

    return `${secs}s`;
  };

  const formatDate = (
    dateString: string
  ) =>
    new Date(
      dateString
    ).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  const formatHour = (
    dateString: string
  ) =>
    new Date(
      dateString
    ).toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );

  const handleStart = () => {
    if (!description.trim()) {
      alert(
        "Please enter a description."
      );

      return;
    }

    if (!startTime) {
      setStartTime(
        new Date()
      );
    }

    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    if (!startTime) {
      return;
    }

    const endTime =
      new Date();

    const durationSeconds =
      seconds;

    createSessionMutation.mutate(
      {
        description,
        started_at:
          startTime.toISOString(),
        ended_at:
          endTime.toISOString(),
        duration_seconds:
          durationSeconds,
      },
      {
        onSuccess: () => {
          setIsRunning(false);
          setSeconds(0);
          setStartTime(null);
          setDescription("");
        },
      }
    );
  };

  const handleDelete = (
    id: number
  ) => {
    deleteSessionMutation.mutate(
      id
    );
  };

  const sortedSessions =
    [...sessions].sort(
      (a, b) =>
        new Date(
          b.started_at
        ).getTime() -
        new Date(
          a.started_at
        ).getTime()
    );
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

    return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-800">
          Study Sessions
        </h1>

        <p className="mt-2 text-slate-500">
          Track your learning activity and
          study performance.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <PanelCard title="Study Timer">
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <h2 className="text-6xl font-bold tracking-wider text-slate-800">
                {formatTime(seconds)}
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                {isRunning
                  ? "Session in progress..."
                  : "Ready to start a study session"}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>

              <input
                type="text"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="What are you studying?"
                className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-800 outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <TimerButton
                color="sky"
                onClick={handleStart}
                disabled={isRunning}
              >
                Start
              </TimerButton>

              <TimerButton
                color="amber"
                onClick={handlePause}
                disabled={!isRunning}
              >
                Pause
              </TimerButton>

              <TimerButton
                color="red"
                onClick={handleStop}
              >
                Stop
              </TimerButton>
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Session History">
          <div className="max-h-[650px] space-y-4 overflow-y-auto">
            {sessions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
                No sessions yet
              </div>
            ) : (
              sortedSessions.map(
                (session) => (
                  <div
                    key={session.id}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="rounded-lg bg-sky-100 px-3 py-1 text-sm text-sky-700">
                          {formatDuration(
                            session.duration_seconds
                          )}
                        </span>

                        <p className="mt-3 font-medium text-slate-800">
                          {
                            session.description
                          }
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                          {formatDate(
                            session.started_at
                          )}{" "}
                          •{" "}
                          {formatHour(
                            session.started_at
                          )}{" "}
                          -{" "}
                          {formatHour(
                            session.ended_at
                          )}
                        </p>
                      </div>

                      <CardActions
                        editHref={`/sessions/edit/${session.id}`}
                        onDelete={() =>
                          handleDelete(
                            session.id
                          )
                        }
                      />
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </PanelCard>
      </section>
    </div>
  );
}