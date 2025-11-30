import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggeredSection = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const MotionLink = motion(Link);

export const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.featured_agents || []);
        setCategories(data.categories || []);
      });
  }, []);

  return (
    <div className="">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggeredSection}
        className="relative -mx-4 md:-mx-8 lg:-mx-12 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/15 via-slate-950 to-slate-950" />
        <div className="relative w-full px-4 md:px-8 lg:px-12 py-20 md:py-28 lg:py-36 min-h-[75vh]">
          <div className="relative flex flex-col items-center text-center gap-12 lg:gap-16">
            <motion.div
              variants={fadeUp}
              className="space-y-6 max-w-4xl w-full mx-auto text-center"
            >
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.4)]" />
              New · AI agents for real-world work
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-slate-50">
              Build your <span className="text-emerald-300">AI team</span>, not just one-off tools.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto">
              AgentMarket is a marketplace for production-ready AI agents. Browse, compare, and deploy specialists for
              sales, real estate, product, and more—like hiring SaaS.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 justify-center">
              <Link
                to="/categories/sales-outreach"
                className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 text-base md:text-lg font-medium text-slate-950 shadow-[0_18px_40px_rgba(16,185,129,0.6)] hover:bg-emerald-400 transition-colors"
              >
                Explore sales agents
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/60 px-5 py-2.5 text-base md:text-lg font-medium text-slate-200 hover:border-emerald-400/70 hover:text-emerald-100 transition-colors"
              >
                Browse all categories
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-slate-400 pt-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>No-code deployment in days, not months</span>
              </div>
              <span className="hidden md:inline-block h-px w-8 bg-slate-700" />
              <span>Backed by Rails, React & modern AI infra</span>
            </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative w-full lg:max-w-none">
              <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.22),transparent_55%)] opacity-80" />
              <motion.div
                className="relative overflow-hidden rounded-[32px] border border-slate-700/70 bg-slate-950/80 shadow-[0_40px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl p-6 md:p-10 lg:p-12 text-left w-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Mock AgentMarket dashboard */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-6 mb-8 md:mb-10">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="flex gap-2">
                      <span className="flex h-3 w-3 rounded-full bg-rose-500" />
                      <span className="flex h-3 w-3 rounded-full bg-amber-400" />
                      <span className="flex h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="ml-4 text-xl font-medium">AgentMarket · Workspace</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-100 font-medium">All agents live</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left sidebar: pods & integrations */}
                  <div className="lg:col-span-3 space-y-8">
                    <div>
                      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Pods
                      </p>
                      <div className="space-y-3">
                        {[
                          { label: "Sales pod", agents: "4 agents", active: true },
                          { label: "Real estate pod", agents: "3 agents" },
                          { label: "Product pod", agents: "2 agents" },
                          { label: "Dev pod", agents: "5 agents" },
                        ].map((pod) => (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            key={pod.label}
                            className={`cursor-pointer flex items-center justify-between rounded-xl px-5 py-4 transition-all ${
                              pod.active
                                ? "bg-slate-900 ring-1 ring-emerald-400/70 shadow-[0_12px_30px_rgba(16,185,129,0.45)]"
                                : "bg-slate-900/40 border border-slate-800 hover:bg-slate-800/60"
                            }`}
                          >
                            <span className="text-base font-medium text-slate-100">{pod.label}</span>
                            <span className="text-xs text-slate-400">{pod.agents}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Integrations
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Slack", "GitHub", "HubSpot", "Salesforce", "Linear", "Notion"].map((name) => (
                          <span
                            key={name}
                            className="inline-flex items-center rounded-full bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-200 ring-1 ring-slate-700/70 hover:ring-emerald-500/50 hover:text-emerald-100 transition-colors cursor-default"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main board: tasks, pipelines & activity across agents */}
                  <div className="lg:col-span-9 space-y-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                          Today in your AI team
                        </p>
                        <p className="text-2xl md:text-3xl text-slate-100 font-light tracking-tight">
                          Agents are <span className="text-emerald-300">triaging tickets</span>, reviewing PRs, and <span className="text-emerald-300">closing leads</span>.
                        </p>
                      </div>
                      <span className="hidden xl:inline-flex items-center rounded-full bg-slate-900/80 px-5 py-2 text-sm text-slate-300 border border-slate-800">
                        12 active tasks · 4 agents
                      </span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                      <motion.div whileHover={{ y: -4 }} className="rounded-3xl bg-slate-950/60 border border-slate-800/60 p-6 space-y-4 hover:border-emerald-500/30 hover:bg-slate-900/40 transition-colors min-h-[240px] flex flex-col">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                          Sales follow-ups
                        </p>
                        <div className="space-y-3 flex-1">
                          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-lg">
                            <p className="text-base font-medium text-slate-100 leading-snug">
                              18 leads ready for next-touch outreach
                            </p>
                            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                              <span>Sales agent</span>
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-300 font-medium">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Live
                              </span>
                            </div>
                          </div>
                          <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5 opacity-75">
                            <p className="text-sm font-medium text-slate-200">3 campaigns finishing A/B tests</p>
                            <p className="mt-1 text-xs text-slate-400">Syncing results to HubSpot</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ y: -4 }} className="rounded-3xl bg-slate-950/60 border border-slate-800/60 p-6 space-y-4 hover:border-sky-500/30 hover:bg-slate-900/40 transition-colors min-h-[240px] flex flex-col">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">
                          Code reviews
                        </p>
                        <div className="space-y-3 flex-1">
                          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-lg">
                            <p className="text-base font-medium text-slate-100 leading-snug">5 PRs in review</p>
                            <p className="mt-2 text-xs text-slate-400">Dev agent suggesting tests & refactors</p>
                          </div>
                          <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5 opacity-75">
                            <p className="text-sm font-medium text-slate-200">Security scan clean</p>
                            <p className="mt-1 text-xs text-slate-400">No violations found</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ y: -4 }} className="rounded-3xl bg-slate-950/60 border border-slate-800/60 p-6 space-y-4 hover:border-fuchsia-500/30 hover:bg-slate-900/40 transition-colors min-h-[240px] flex flex-col">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-400">
                          Ops & support
                        </p>
                        <div className="space-y-3 flex-1">
                          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-lg">
                            <p className="text-base font-medium text-slate-100 leading-snug">42 tickets auto-triaged</p>
                            <p className="mt-2 text-xs text-slate-400">Customer agent drafting responses</p>
                          </div>
                          <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5 opacity-75">
                            <p className="text-sm font-medium text-slate-200">Weekly report ready</p>
                            <p className="mt-1 text-xs text-slate-400">Summary sent to Slack</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Deeper dashboard row: pipeline & agent performance */}
                    <div className="grid gap-6 pt-4 md:grid-cols-[1.6fr_1fr]">
                      <motion.div whileHover={{ scale: 1.01 }} className="rounded-3xl bg-slate-950/60 border border-slate-800/60 p-8 space-y-6 hover:border-slate-700/80 transition-colors">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-400">
                            Pipeline by stage
                          </p>
                          <span className="text-xs text-slate-500 font-medium">Last 24 hours</span>
                        </div>
                        <div className="space-y-4">
                          {["New", "Qualified", "Proposal sent", "Closed won"].map((stage, idx) => (
                            <div key={stage} className="group flex items-center justify-between gap-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 px-5 py-3 hover:bg-slate-900/80 transition-colors">
                              <div className="space-y-2 w-full">
                                <div className="flex justify-between items-center">
                                   <p className="text-sm font-semibold text-slate-200">{stage}</p>
                                   <p className="text-sm tabular-nums text-slate-400 font-medium group-hover:text-emerald-300 transition-colors">
                                      {idx === 0 && "32 leads"}
                                      {idx === 1 && "18 in review"}
                                      {idx === 2 && "7 proposals"}
                                      {idx === 3 && "4 won"}
                                    </p>
                                </div>
                                <div className="h-3 w-full rounded-full bg-slate-950 overflow-hidden">
                                  <div
                                    className={
                                      "h-full rounded-full bg-gradient-to-r " +
                                      (idx === 3
                                        ? "from-emerald-500 to-emerald-300"
                                        : idx === 2
                                        ? "from-sky-500 to-sky-300"
                                        : "from-slate-600 to-slate-400")
                                    }
                                    style={{ width: ["38%", "52%", "64%", "82%"][idx] }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.01 }} className="rounded-3xl bg-slate-950/60 border border-slate-800/60 p-8 space-y-6 hover:border-slate-700/80 transition-colors">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-400">
                            Performance (24h)
                          </p>
                          <span className="text-xs text-slate-500 font-medium">Live metrics</span>
                        </div>
                        <div className="space-y-3">
                          {["Sales outreach", "Real estate lead qual", "Support triage", "Dev PR reviewer"].map(
                            (agent, idx) => (
                              <div
                                key={agent}
                                className="flex flex-col gap-1.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 px-5 py-3.5 hover:bg-slate-900/80 transition-colors"
                              >
                                <div className="flex justify-between items-center">
                                  <p className="truncate text-sm font-semibold text-slate-200">{agent}</p>
                                  <p className="text-sm font-bold text-emerald-400 tabular-nums">
                                    {idx === 0 && "98%"}
                                    {idx === 1 && "94%"}
                                    {idx === 2 && "100%"}
                                    {idx === 3 && "92%"}
                                  </p>
                                </div>
                                <p className="text-xs text-slate-400">
                                  {idx === 0 && "126 tasks · High availability"}
                                  {idx === 1 && "82 leads · 12m avg response"}
                                  {idx === 2 && "42 tickets · Instant reply"}
                                  {idx === 3 && "11 PRs · Deep analysis"}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    </div>
                    
                     {/* Activity feed gives the bottom of the mock full, real-dashboard feel */}
                    <div className="mt-2 rounded-3xl bg-slate-950/90 border border-slate-800/80 p-6 md:p-8">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-300">
                          Live activity
                        </p>
                        <span className="inline-flex items-center gap-2 text-xs text-slate-400 font-medium">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          Streaming from AgentMarket
                        </span>
                      </div>
                      <div className="space-y-3">
                        {[
                          "Sales outreach agent replied to 6 new leads",
                          "Real estate pod synced 12 listings from Zillow",
                          "Support triage agent escalated 3 priority tickets",
                          "Dev PR reviewer suggested changes on #421",
                          "Security scan agent completed nightly run",
                        ].map((event, idx) => (
                          <div key={event} className="flex items-center justify-between gap-4 text-sm text-slate-300 border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
                            <p className="truncate">
                              <span className="text-slate-500 font-mono mr-3">{["Just now", "2m", "5m", "16m", "32m"][idx]}</span>
                              {event}
                            </p>
                            <span className="hidden md:inline-flex rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-400 border border-slate-800">
                              {idx < 2 ? "Workspace" : "System"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

        </div>
      </div>
      </motion.section>

      {/* Trusted by Professionals - horizontally scrolling brand logos */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
        className="relative -mx-4 md:-mx-8 lg:-mx-12"
      >
        <div className="absolute inset-0 border-y border-slate-800/70 bg-slate-950/80" />
        <div className="relative w-full py-20 md:py-28 lg:py-36 space-y-12 md:space-y-16">
          <div className="px-4 md:px-8 lg:px-12 mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="text-sm md:text-base font-bold uppercase tracking-[0.28em] text-emerald-300">
                Trusted by teams shipping AI to production
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-3xl leading-tight">
                Revenue, product, and operations teams rely on AgentMarket to ship AI agents into real customer workflows
                faster.
              </p>
            </div>
            <p className="text-sm md:text-base text-slate-500">
              Logos for illustration only · No affiliation implied
            </p>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            {/* Scrolling track */}
            <div className="flex gap-16 md:gap-24 whitespace-nowrap animate-scroll-x will-change-transform py-4">
              {[1, 2, 3, 4].map((loop) => (
                <div key={loop} className="flex items-center gap-16 md:gap-24">
                  <div className="inline-flex items-center gap-4 text-xl md:text-2xl font-semibold text-slate-100">
                    <span className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-emerald-500" />
                    <span>Northwind Analytics</span>
                  </div>
                  <div className="inline-flex items-center gap-4 text-xl md:text-2xl font-semibold text-slate-100">
                    <span className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-sky-500" />
                    <span>Acme Realty Group</span>
                  </div>
                  <div className="inline-flex items-center gap-4 text-xl md:text-2xl font-semibold text-slate-100">
                    <span className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-fuchsia-500" />
                    <span>Launchpad SaaS</span>
                  </div>
                  <div className="inline-flex items-center gap-4 text-xl md:text-2xl font-semibold text-slate-100">
                    <span className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-amber-400" />
                    <span>Cascade Finance</span>
                  </div>
                  <div className="inline-flex items-center gap-4 text-xl md:text-2xl font-semibold text-slate-100">
                    <span className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-indigo-500" />
                    <span>OrbitOps</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Shop by category */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="premium-section-wrapper"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/20 to-slate-950" />
        
        <div className="premium-section-inner">
          <div className="mb-16 md:mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between max-w-[1600px] mx-auto">
            <div className="space-y-4 max-w-3xl">
              <p className="premium-label text-emerald-400">Explore Specialties</p>
              <h2 className="premium-header">
                Find the perfect <span className="text-emerald-300">AI specialist</span> for any task.
              </h2>
            </div>
            <p className="premium-subtext max-w-lg">
              Browse our marketplace of verified agents, categorized by function and industry.
            </p>
          </div>

          <div className="grid gap-8 md:gap-10 lg:grid-cols-3 max-w-[1800px] mx-auto">
            {categories.map((cat) => (
              <Link key={cat.slug} to={`/categories/${cat.slug}`} className="group block h-full">
                <motion.article
                  whileHover={{ y: -8 }}
                  className="premium-card h-full flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-bold text-emerald-400 border border-slate-800 group-hover:border-emerald-500/50 group-hover:text-emerald-300 transition-colors shadow-inner">
                        {cat.name[0]}
                      </span>
                      <span className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-xs font-medium text-slate-300 group-hover:border-emerald-500/30 group-hover:text-emerald-200 transition-colors">
                        {cat.agent_count} agents
                      </span>
                    </div>
                    <div>
                      <h3 className="premium-card-title group-hover:text-emerald-300 transition-colors">{cat.name}</h3>
                      <p className="mt-4 text-lg text-slate-400 line-clamp-2 leading-relaxed">{cat.tagline}</p>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-500 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Browse category</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* You're in good company - testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="premium-section-wrapper"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-emerald-950/20" />
        <div className="premium-section-inner space-y-16 md:space-y-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between max-w-[1600px] mx-auto">
            <div className="space-y-4 max-w-4xl">
              <p className="premium-label text-emerald-400">
                You&apos;re in good company
              </p>
              <h2 className="premium-header">
                Teams use AgentMarket to give each workflow a dedicated AI teammate.
              </h2>
            </div>
            <p className="premium-subtext max-w-md">
              Short testimonials from early adopters using AI agents in sales, operations, and customer success.
            </p>
          </div>

          <div className="grid gap-8 lg:gap-12 md:grid-cols-3 max-w-[1800px] mx-auto">
          {[
            {
              name: "Jordan Lee",
              title: "Head of RevOps",
              company: "Northwind Analytics",
              quote:
                "Our outbound pipeline doubled in six weeks once we added a sales outreach agent. It feels like we hired three new SDRs overnight.",
              bg: "bg-emerald-500/80",
            },
            {
              name: "Priya Desai",
              title: "Director of CX",
              company: "Acme Realty Group",
              quote:
                "The support agent handles 60% of routine tickets so our human team can focus on complex, relationship-driven work.",
              bg: "bg-sky-500/80",
            },
            {
              name: "Alex Martinez",
              title: "VP of Product",
              company: "Launchpad SaaS",
              quote:
                "We prototype, test, and ship new AI workflows in days instead of months. AgentMarket is how we experiment safely.",
              bg: "bg-fuchsia-500/80",
            },
          ].map((t) => (
            <motion.article
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="premium-card flex flex-col justify-between group"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-2xl bg-slate-900 shadow-inner">
                      <div className={`absolute inset-0 ${t.bg} opacity-80`} />
                      <span className="relative flex h-full w-full items-center justify-center text-lg font-bold text-slate-950">
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg md:text-xl font-bold text-slate-50">{t.name}</span>
                      <span className="text-sm md:text-base text-slate-400">{t.title}</span>
                      <span className="text-sm md:text-base text-emerald-400 font-medium">{t.company}</span>
                    </div>
                </div>
                <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug text-slate-200">
                    “{t.quote}”
                </p>
              </div>
            </motion.article>
          ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};
