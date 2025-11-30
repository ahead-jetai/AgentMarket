import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogoIcon } from "./LogoIcon";

const COFOUNDER_AGENT_SKU = "GEN-AGENT-001";
const COFOUNDER_AGENT_SLUG = "cofounder_brainstorm";

export const WorkspacePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  
  // Co-founder Agent State
  const [runs, setRuns] = useState([]);
  const [runStatus, setRunStatus] = useState("idle"); // idle, running, success, failed
  const [runResult, setRunResult] = useState(null);
  
  const initialFormState = {
    idea_summary: "",
    target_user: "",
    stage: "idea_validation",
    focus: "market"
  };
  
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const initWorkspace = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) {
            if (res.status === 401) {
                 navigate("/login");
            }
            return;
        }
        const data = await res.json();
        setUser(data.user);
        setAgents(data.purchased_agents || []);
        
        // If we have the co-founder agent, fetch its history
        if (data.purchased_agents && data.purchased_agents.find(a => a.sku === COFOUNDER_AGENT_SKU)) {
            fetchRuns();
        }
      } catch (err) {
        console.error("Failed to load workspace", err);
      }
    };

    initWorkspace();
  }, [navigate]);

  const fetchRuns = async () => {
    try {
        const res = await fetch(`/api/agents/${COFOUNDER_AGENT_SLUG}/runs`);
        if (res.ok) {
            const data = await res.json();
            setRuns(data.runs);
        }
    } catch (e) {
        console.error("Failed to fetch runs", e);
    }
  };
  
  const handleNewSession = () => {
    setFormData(initialFormState);
    setRunResult(null);
    setRunStatus("idle");
  };

  const handleLoadSession = (run) => {
      let inputData = run.input_payload;
      if (typeof inputData === 'string') {
          try {
              inputData = JSON.parse(inputData);
          } catch (e) {
              console.error("Failed to parse input payload", e);
              inputData = {};
          }
      }
      // Merge with initial state to ensure all fields exist
      setFormData({ ...initialFormState, ...inputData });

      let outputData = run.output_payload;
      // Try to parse if it looks like a JSON string but is stored as string
      if (typeof outputData === 'string' && (outputData.startsWith('{') || outputData.startsWith('['))) {
          try {
              outputData = JSON.parse(outputData);
          } catch (e) {
              // keep as string
          }
      }

      setRunResult(outputData);
      setRunStatus(run.status === 'succeeded' ? 'success' : 'idle');
  };
  
  const handleRunAgent = async (e) => {
    e.preventDefault();
    setRunStatus("running");
    setRunResult(null);

    try {
      const res = await fetch(`/api/agents/${COFOUNDER_AGENT_SLUG}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Agent run failed");

      const data = await res.json();
      setRunResult(data.run.output_payload);
      setRunStatus("success");
      fetchRuns(); // Refresh history
    } catch (err) {
      console.error(err);
      setRunStatus("failed");
    }
  };

  // Helper to check if user has the brainstorm agent
  const hasBrainstormer = agents.some(a => a.sku === COFOUNDER_AGENT_SKU);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 lg:p-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-6 mb-8 md:mb-10">
        <div className="flex items-center gap-4 text-slate-300">
            <Link to="/dashboard" className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </Link>
          <div className="flex gap-2">
            <span className="flex h-3 w-3 rounded-full bg-rose-500" />
            <span className="flex h-3 w-3 rounded-full bg-amber-400" />
            <span className="flex h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="ml-4 flex items-center gap-3">
            <LogoIcon size="small" />
            <span className="text-xl font-medium">AgentMarket · Workspace</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-100 font-medium">All agents live</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left sidebar: My Agents */}
        <div className="lg:col-span-3 space-y-8">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              My Agents
            </p>
            <div className="space-y-3">
              {agents.map((agent) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`cursor-pointer flex items-center justify-between rounded-xl px-5 py-4 transition-all ${
                    selectedAgent?.id === agent.id
                      ? "bg-slate-900 ring-1 ring-emerald-400/70 shadow-[0_12px_30px_rgba(16,185,129,0.45)]"
                      : "bg-slate-900/40 border border-slate-800 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-base font-medium text-slate-100 truncate max-w-[150px]">{agent.name}</span>
                  </div>
                </motion.div>
              ))}
              {agents.length === 0 && (
                 <p className="text-sm text-slate-500 italic">No agents purchased yet.</p>
              )}
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Integrations
            </p>
            <div className="flex flex-wrap gap-2">
              {["Slack", "GitHub", "HubSpot", "Salesforce"].map((name) => (
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

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
            
          {selectedAgent ? (
            <div className="rounded-3xl bg-slate-950/60 border border-slate-800/60 p-6 md:p-10 min-h-[500px]">
                <div className="flex items-center gap-4 mb-8">
                    {selectedAgent.sku === COFOUNDER_AGENT_SKU && (
                        <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                        </div>
                    )}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-100">{selectedAgent.name}</h2>
                        <p className="text-slate-400">{selectedAgent.description}</p>
                    </div>
                </div>

                {selectedAgent.sku === COFOUNDER_AGENT_SKU ? (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                 <form onSubmit={handleRunAgent} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Idea Summary</label>
                                        <textarea
                                            required
                                            className="w-full rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all min-h-[100px]"
                                            placeholder="e.g., A marketplace for AI agents..."
                                            value={formData.idea_summary}
                                            onChange={(e) => setFormData({...formData, idea_summary: e.target.value})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
                                            <input 
                                                type="text"
                                                className="w-full rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 p-3 focus:border-emerald-500"
                                                placeholder="e.g., Developers"
                                                value={formData.target_user}
                                                onChange={(e) => setFormData({...formData, target_user: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Stage</label>
                                            <select 
                                                className="w-full rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 p-3 focus:border-emerald-500"
                                                value={formData.stage}
                                                onChange={(e) => setFormData({...formData, stage: e.target.value})}
                                            >
                                                <option value="idea_validation">Idea Validation</option>
                                                <option value="mvp">MVP</option>
                                                <option value="growth">Growth</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={runStatus === "running"}
                                        className="w-full py-4 rounded-xl bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {runStatus === "running" ? "Brainstorming..." : "Run Brainstorm Session"}
                                    </button>
                                 </form>
                            </div>

                            {/* History / Previous Runs */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Previous Sessions</h3>
                                    <button
                                        onClick={handleNewSession}
                                        className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-emerald-500/10 transition-colors"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                        New Brainstorm
                                    </button>
                                </div>
                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                    {runs.map((run) => (
                                        <div
                                            key={run.id}
                                            onClick={() => handleLoadSession(run)}
                                            className="cursor-pointer p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs text-slate-400 group-hover:text-emerald-400/70 transition-colors">{new Date(run.created_at).toLocaleDateString()}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${run.status === 'succeeded' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                                    {run.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-300 line-clamp-2">
                                                {(typeof run.input_payload === 'string' ? JSON.parse(run.input_payload) : run.input_payload)?.idea_summary}
                                            </p>
                                        </div>
                                    ))}
                                    {runs.length === 0 && (
                                        <p className="text-sm text-slate-500">No previous sessions found.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {runResult && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-8"
                            >
                                <div className="flex items-center gap-2 text-emerald-400 font-medium text-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Analysis Complete
                                </div>
                                
                                {typeof runResult === 'string' ? (
                                        <div className="prose prose-invert prose-sm max-w-none">
                                        <div className="whitespace-pre-wrap text-slate-300">{runResult}</div>
                                        </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
                                            <h4 className="text-emerald-400 font-bold mb-3 text-sm uppercase tracking-wider">Executive Summary</h4>
                                            <p className="text-slate-200 text-lg leading-relaxed">{runResult.summary}</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {runResult.market_insights && (
                                                <div>
                                                    <h4 className="text-slate-400 font-bold mb-4 text-xs uppercase tracking-wider">Market Insights</h4>
                                                    <ul className="space-y-3">
                                                        {runResult.market_insights.map((insight, i) => (
                                                            <li key={i} className="flex gap-3 text-slate-300 text-sm">
                                                                <span className="text-emerald-500 mt-1 shrink-0">▹</span>
                                                                <span>{insight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {runResult.user_personas && (
                                                <div>
                                                    <h4 className="text-slate-400 font-bold mb-4 text-xs uppercase tracking-wider">Target Personas</h4>
                                                    <div className="space-y-3">
                                                        {runResult.user_personas.map((persona, i) => (
                                                            <div key={i} className="p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                                                                <p className="font-bold text-slate-200">{persona.name}</p>
                                                                <p className="text-sm text-slate-400 mt-1">{persona.description}</p>
                                                                {persona.pain_points && (
                                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                                        {persona.pain_points.map((pt, j) => (
                                                                            <span key={j} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-xs border border-rose-500/20">{pt}</span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {runResult.risks && (
                                                <div>
                                                    <h4 className="text-amber-400 font-bold mb-3 text-xs uppercase tracking-wider">Potential Risks</h4>
                                                    <ul className="space-y-2">
                                                        {runResult.risks.map((risk, i) => (
                                                            <li key={i} className="text-slate-400 text-sm border-l-2 border-amber-500/30 pl-3">
                                                                {risk}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            
                                            {runResult.next_steps && (
                                                <div>
                                                    <h4 className="text-sky-400 font-bold mb-3 text-xs uppercase tracking-wider">Recommended Next Steps</h4>
                                                    <ul className="space-y-2">
                                                        {runResult.next_steps.map((step, i) => (
                                                            <li key={i} className="text-slate-300 text-sm flex items-center gap-2">
                                                                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">{i+1}</span>
                                                                {step}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                        <p>This agent functionality is not yet fully implemented in the workspace demo.</p>
                        <p className="text-sm mt-2">Only "Startup Brainstormer" is fully functional.</p>
                    </div>
                )}
            </div>
          ) : (
             /* Default Dashboard View (Mockup Content) */
            <div className="space-y-8">
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
                    {agents.length} active agents
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                   {/* Example Cards from Mockup */}
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
                    </div>
                  </motion.div>
                   
                   {/* Add more mock cards or instructions */}
                    <motion.div whileHover={{ y: -4 }} className="rounded-3xl bg-slate-950/60 border border-slate-800/60 p-6 space-y-4 hover:border-sky-500/30 hover:bg-slate-900/40 transition-colors min-h-[240px] flex flex-col">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">
                          Quick Actions
                        </p>
                        <div className="space-y-3 flex-1 flex flex-col justify-center">
                             {hasBrainstormer ? (
                                <button 
                                    onClick={() => {
                                        const brainstormer = agents.find(a => a.sku === COFOUNDER_AGENT_SKU);
                                        if (brainstormer) setSelectedAgent(brainstormer);
                                    }}
                                    className="w-full py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors text-sm font-bold"
                                >
                                    Launch Brainstormer
                                </button>
                             ) : (
                                <p className="text-sm text-slate-400 text-center">Purchase the Startup Brainstormer to see it in action.</p>
                             )}
                        </div>
                    </motion.div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
