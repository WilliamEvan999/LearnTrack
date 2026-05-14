type StatCardProps = {
  title: string;
  value: string | number;
  icon?: string;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            {value}
          </h2>

        </div>

        {icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            {icon}
          </div>
        )}

      </div>

    </div>
  );
}