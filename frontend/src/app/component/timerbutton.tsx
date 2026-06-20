"use client";

type TimerButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  color: "sky" | "amber" | "red";
};

export default function TimerButton({
  children,
  onClick,
  disabled = false,
  color,
}: TimerButtonProps) {
  const colors = {
    sky: "bg-sky-600 hover:bg-sky-700",
    amber: "bg-amber-500 hover:bg-amber-600",
    red: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl
        px-4
        py-3
        font-medium
        text-white
        transition
        disabled:bg-slate-400
        disabled:cursor-not-allowed
        ${colors[color]}
      `}
    >
      {children}
    </button>
  );
}