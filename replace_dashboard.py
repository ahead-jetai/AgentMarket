import os

file_path = '/Users/arthurhead/RubymineProjects/rails-AI-agent/app/javascript/spa/HomePage.jsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

# New dashboard content
new_dashboard = """            <motion.div variants={fadeUp} className="relative w-full lg:max-w-none">
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
"""

# 0-based indices
start_line_idx = 87
end_line_idx = 356 

print(f"Replacing from line {start_line_idx+1}")
print(f"To line {end_line_idx}")
print(f"Start content: {lines[start_line_idx].strip()}")
print(f"End content: {lines[end_line_idx-1].strip()}")

lines[start_line_idx:end_line_idx] = [new_dashboard + '\n']

with open(file_path, 'w') as f:
    f.writelines(lines)
