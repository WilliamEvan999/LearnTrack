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

export default function EditSessionPage() {
  const params = useParams();

  const router = useRouter();

  const queryClient =
    useQueryClient();

  const sessionId = Number(
    params.id
  );

  const [
    description,
    setDescription,
  ] = useState("");

  const {
    data: session,
    isLoading,
  } = useQuery({
    queryKey: [
      "session",
      sessionId,
    ],
    queryFn: () =>
      apiRouter.studySession.getStudySession(
        sessionId
      ),
  });

  useEffect(() => {
    if (session) {
      setDescription(
        session.description ??
          ""
      );
    }
  }, [session]);

  const updateSessionMutation =
    useMutation({
      mutationFn: () =>
        apiRouter.studySession.updateStudySession(
          {
            id: sessionId,
            description,
          }
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "sessions",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "session",
            sessionId,
          ],
        });

        router.push(
          "/sessions"
        );
      },

      onError: () => {
        alert(
          "Failed to update session"
        );
      },
    });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !description.trim()
    ) {
      alert(
        "Please enter a description"
      );

      return;
    }

    updateSessionMutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-red-600">
          Session Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold text-slate-900">
          Edit Session
        </h1>

        <p className="mt-2 text-slate-500">
          Update your study session
          description.
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
              placeholder="What were you studying?"
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-800 outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="/sessions"
              className="rounded-2xl border border-slate-300 px-6 py-4 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                updateSessionMutation.isPending
              }
              className="rounded-2xl bg-sky-600 px-6 py-4 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateSessionMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}