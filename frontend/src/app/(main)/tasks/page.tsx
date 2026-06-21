"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import Filter from "@/app/component/filter";
import TaskCard from "@/app/component/taskcard";
import apiRouter from "@/api/router";

export default function TasksPage() {
  const [activeTab, setActiveTab] =  useState("progress");
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn:
      apiRouter.tasks.getTasks,
  });

  const updateTaskMutation =
    useMutation({
      mutationFn:
        apiRouter.tasks.updateTask,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });

        queryClient.invalidateQueries({
          queryKey: ["progress"],
        });
      },

      onError: () => {
        alert(
          "Failed to update task"
        );
      },
    });

  const deleteTaskMutation =
    useMutation({
      mutationFn:
        apiRouter.tasks.deleteTask,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },

      onError: () => {
        alert(
          "Failed to delete task"
        );
      },
    });

  const toggleTask = (
    id: number
  ) => {
    const task = tasks.find(
      (task) => task.id === id
    );

    if (!task) {
      return;
    }

    updateTaskMutation.mutate({
      ...task,
      completed: !task.completed,
    });
  };

  const deleteTask = (
    id: number
  ) => {
    deleteTaskMutation.mutate(id);
  };

  const filteredTasks = tasks
    .filter((task) =>
      activeTab === "progress"
        ? !task.completed
        : task.completed
    )
    .sort((a, b) => {
      if (activeTab !== "progress") {
        return 0;
      }

      const today = new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const dateA =
        new Date(a.due_date);

      const dateB =
        new Date(b.due_date);

      dateA.setHours(
        0,
        0,
        0,
        0
      );

      dateB.setHours(
        0,
        0,
        0,
        0
      );

      const overdueA =
        dateA < today;

      const overdueB =
        dateB < today;

      if (
        overdueA &&
        !overdueB
      ) {
        return 1;
      }

      if (
        !overdueA &&
        overdueB
      ) {
        return -1;
      }

      if (
        overdueA &&
        overdueB
      ) {
        return (
          dateB.getTime() -
          dateA.getTime()
        );
      }

      return (
        dateA.getTime() -
        dateB.getTime()
      );
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-800">
          Tasks
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your study tasks and stay
          productive.
        </p>
      </section>

      <Filter
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <section className="space-y-3">
        {filteredTasks.length ===
        0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            {activeTab === "progress"
              ? "No active tasks"
              : "No completed tasks"}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              due_date={task.due_date}
              category={task.category}
              onToggle={() =>
                toggleTask(task.id)
              }
              onDelete={() =>
                deleteTask(task.id)
              }
            />
          ))
        )}
      </section>

      <Link
        href="/tasks/new"
        className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-sky-600 text-4xl text-white shadow-lg transition hover:bg-sky-700"
      >
        +
      </Link>
    </div>
  );
}