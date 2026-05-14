type PanelProps = {
  title: string;
  children: React.ReactNode;
};

export default function Panel({
  title,
  children,
}: PanelProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

      </div>

      <div className="mt-6 space-y-4">
        {children}
      </div>

    </div>
  );
}