type FilterProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  {
    label: "In Progress",
    value: "progress",
    activeClass: "bg-sky-600 text-white",
  },
  {
    label: "Completed",
    value: "completed",
    activeClass: "bg-emerald-600 text-white",
  },
];

export default function Filter({
  activeTab,
  setActiveTab,
}: FilterProps) {

  return (
    <section className="flex items-center gap-3">

      {tabs.map((tab) => (

        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === tab.value
              ? tab.activeClass
              : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
          }`}
        >
          {tab.label}
        </button>

      ))}

    </section>
  );
}