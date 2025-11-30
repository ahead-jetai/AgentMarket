import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/categories/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.category);
        setAgents(data.agents || []);
      });
  }, [slug]);

  if (!category) {
    return <p className="text-slate-400 text-sm">Loading category…</p>;
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-300"
        >
          <span className="mr-1">←</span>
          Back
        </button>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500">Category</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-semibold text-slate-50">{category.name}</h1>
          <p className="mt-2 text-base md:text-lg text-slate-400 max-w-xl">{category.description}</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            to={`/agents/${agent.id}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 hover:border-emerald-400/80 hover:bg-slate-900/80 transition-colors flex flex-col shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-sky-500/15 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative aspect-video mb-3 overflow-hidden rounded-xl bg-slate-900/80 flex items-center justify-center border border-slate-800/50">
              {/* Replaced image with subtle gradient background to make icons cleaner */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900" />
              
              {agent.icon_svg ? (
                <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <div
                    className="h-16 w-16 md:h-20 md:w-20 text-emerald-400 group-hover:text-emerald-300 transition-colors drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                    dangerouslySetInnerHTML={{ __html: agent.icon_svg }}
                  />
                </div>
              ) : (
                <div className="relative z-10 h-16 w-16 rounded-full bg-slate-800/50" />
              )}
            </div>
            <h3 className="relative text-base md:text-lg font-semibold text-slate-50 group-hover:text-emerald-50 line-clamp-2">
              {agent.name}
            </h3>
            <p className="relative mt-1 text-sm md:text-base text-slate-400 line-clamp-2">{agent.short_description}</p>
            <p className="relative mt-3 text-base md:text-lg font-semibold text-emerald-300">
              ${(agent.price / 100).toFixed(0)} / month
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
