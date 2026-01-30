import { useState } from "react";

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const open = idx === openIndex;
        return (
          <div key={idx} className="rounded-2xl border border-neutral-200 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : idx)}
              className="w-full flex items-center justify-between gap-4 p-4 text-left"
            >
              <div className="font-semibold">{it.q}</div>
              <div className="text-neutral-500">{open ? "−" : "+"}</div>
            </button>
            {open ? (
              <div className="px-4 pb-4 text-sm text-neutral-600 leading-relaxed">
                {it.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
