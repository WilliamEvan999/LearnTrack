export default function Preloader() {
  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="text-center">

        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-sky-600" />

        <p className="mt-4 text-sm font-medium text-slate-600">
          Loading Learnify...
        </p>

      </div>

    </div>
  );
}