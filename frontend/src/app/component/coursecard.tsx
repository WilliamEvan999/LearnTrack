import Link from "next/link";

import ActionCard from "./actioncard";

type CourseCardProps = {
  id: number;
  title: string;
  category: string;
  lessons: number;
  progress: number;
  onDelete?: () => void;
};

export default function CourseCard({
  id,
  title,
  category,
  lessons,
  progress,
  onDelete,
}: CourseCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-sky-600">
            {category}
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-800">
            {title}
          </h2>
        </div>

        <span className="rounded-xl bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
          {progress}%
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {lessons} Lessons
      </p>

      <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-sky-600"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Link
          href={`/courses/${id}`}
          className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {progress === 100
            ? "Review Course"
            : "Open Course"}
        </Link>

        <ActionCard
          editHref={`/courses/edit/${id}`}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}