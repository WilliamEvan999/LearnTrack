type DashboardPanelProps = {
  title: string;
  href?: string;
  children: React.ReactNode;
};

export default function DashboardPanel({
  title,
  href,
  children,
}: DashboardPanelProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        <a
          href={href}
          className="text-sm font-medium text-sky-600 hover:text-sky-700"
        >
          View All
        </a>

      </div>

      <div className="mt-6 space-y-4">
        {children}
      </div>

    </div>
  );
}