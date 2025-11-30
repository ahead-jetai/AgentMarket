import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading && categories.length === 0) {
    return <p className="text-slate-400 text-sm">Loading categories...</p>;
  }

  if (!loading && categories.length === 0) {
    return <p className="text-slate-400 text-sm">No categories available yet.</p>;
  }

  return (
    <div className="relative -mx-4 md:-mx-8 lg:-mx-12 -mt-4 md:-mt-6 lg:-mt-8 bg-gradient-to-b from-emerald-500/15 min-h-screen">
      <div className="relative w-full px-4 md:px-8 lg:px-12 pt-24 pb-20 space-y-8 md:space-y-10">
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center self-start text-sm font-medium text-slate-400 hover:text-emerald-300"
          >
            <span className="mr-1">←</span>
            Back
          </button>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300">Browse</p>
            <h1 className="mt-1 text-3xl md:text-4xl font-semibold text-slate-50">Browse AI agent categories</h1>
            <p className="mt-2 text-base md:text-lg text-slate-400 max-w-xl">
              Choose a category to explore specialized AI agents for sales, real estate, product, developer tooling,
              and more.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 hover:border-emerald-400/80 hover:bg-slate-900/80 transition-colors flex flex-col justify-between shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-sky-500/15 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="font-medium text-slate-50 group-hover:text-emerald-50 text-base md:text-lg">{cat.name}</h3>
                <p className="mt-1 text-sm md:text-base text-slate-400">{cat.tagline}</p>
              </div>
              <p className="relative mt-4 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                {cat.agent_count} agents
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
