import ActionCard from "@/app/component/actioncard";

type TaskCardProps = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  course: string;
  onToggle: () => void;
  onDelete?: () => void;
};

export default function TaskCard({
  id,
  title,
  completed,
  dueDate,
  course,
  onToggle,
  onDelete,
}: TaskCardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        completed
          ? "opacity-80"
          : ""
      }`}
    >

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-4">

          <div
            className={`mt-1 h-3 w-3 rounded-full ${
              completed
                ? "bg-emerald-500"
                : "bg-orange-500"
            }`}
          />

          <div>

            <div className="flex items-center gap-3">

              <button
                onClick={onToggle}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                  completed
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-300 bg-white hover:border-sky-500"
                }`}
              >
                {completed && "✓"}
              </button>

              <h3
                className={`text-lg font-semibold ${
                  completed
                    ? "text-slate-500"
                    : "text-slate-800"
                }`}
              >
                {title}
              </h3>

            </div>

            <div
              className={`mt-2 flex flex-wrap items-center gap-2 text-sm ${
                completed
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >

              <span>
                {course}
              </span>

              <span>
                •
              </span>

              <span>
                Due {dueDate}
              </span>

            </div>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <span
            className={`rounded-xl px-3 py-1 text-xs font-semibold ${
              completed
                ? "bg-emerald-100 text-emerald-700"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {completed
              ? "Completed"
              : "In Progress"}
          </span>

          <ActionCard
            editHref={`/tasks/edit/${id}`}
            onDelete={onDelete}
          />

        </div>

      </div>

    </div>
  );
}