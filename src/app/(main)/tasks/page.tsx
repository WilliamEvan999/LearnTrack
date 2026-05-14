"use client";

import Link from "next/link";

import { useState } from "react";

import Filter from "@/app/component/filter";
import TaskCard from "@/app/component/taskcard";

import { tasks as initialTasks } from "@/app/data";

export default function TasksPage() {

  const [activeTab, setActiveTab] =
    useState("progress");

  const [tasks, setTasks] =
    useState(initialTasks);

  const toggleTask = (
    id: number
  ) => {

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const deleteTask = (
    id: number
  ) => {

    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) => task.id !== id
      )
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      activeTab === "progress"
        ? !task.completed
        : task.completed
  );

  return (
    <div className="space-y-8">

      <section>

        <h1 className="text-3xl font-bold text-slate-800">
          Tasks
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your study tasks and stay productive.
        </p>

      </section>

      <Filter
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <section className="space-y-3">

        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            dueDate={task.dueDate}
            course={task.course}
            onToggle={() =>
              toggleTask(task.id)
            }
            onDelete={() =>
              deleteTask(task.id)
            }
          />
        ))}

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