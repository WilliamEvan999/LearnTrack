"use client";
import Link from "next/link";
import { useState } from "react";
import {Pencil, Trash2} from "lucide-react";

type CardActionsProps = {
  editHref: string;
  onDelete?: () => void;
};

export default function CardActions({
  editHref,
  onDelete,
}: CardActionsProps) {

  const [showModal, setShowModal] =
    useState(false);

  const handleDelete = () => {

    onDelete?.();
    setShowModal(false);

  };

  return (
    <>

      <div className="flex items-center gap-2">

        <Link
          href={editHref}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Pencil size={16} />
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>

      </div>

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">

            <h2 className="text-xl font-bold text-slate-800">
              Delete Item
            </h2>

            <p className="mt-3 text-slate-500">
              Are you sure you want to delete this item?
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="rounded-2xl border border-slate-200 px-5 py-3 text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-2xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}