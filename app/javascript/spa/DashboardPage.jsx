import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initDashboard = async () => {
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
        let currentAgents = data.purchased_agents || [];

        // Sync Logic: Check localStorage for agents purchased anonymously
        const localAgentsJson = localStorage.getItem("agentmarket_purchased_agents");
        if (localAgentsJson) {
          const localAgents = JSON.parse(localAgentsJson);
          const missingAgents = localAgents.filter(la => !currentAgents.find(ca => ca.id === la.id));
          
          if (missingAgents.length > 0) {
            // Sync them to backend
            const agentIds = missingAgents
              .map(a => a.id)
              .filter(id => id !== undefined && id !== null);

            if (agentIds.length > 0) {
              await fetch("/api/purchases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ agent_ids: agentIds })
              });

              // Refetch to get updated list
              const updatedRes = await fetch("/api/me");
              const updatedData = await updatedRes.json();
              currentAgents = updatedData.purchased_agents;
            }
            
            // Clear local storage to avoid repeated sync checks
            localStorage.removeItem("agentmarket_purchased_agents");
          }
        }

        setAgents(currentAgents);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate]);

  if (loading) return <div className="p-12 text-center text-slate-400">Loading dashboard...</div>;

  return (
    <div className="relative -mx-4 md:-mx-8 lg:-mx-12 -mt-4 md:-mt-6 lg:-mt-8 bg-gradient-to-b from-emerald-500/15 min-h-screen">
      <div className="relative w-full px-4 md:px-8 lg:px-12 pt-24 pb-20 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-slate-50">My Agents</h1>
            <p className="text-slate-400">Manage your purchased AI agents</p>
          </div>
          <div className="flex items-center gap-4">
              <Link
                to="/workspace"
                className="inline-flex items-center rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-medium text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
              >
                Launch Workspace
              </Link>
          </div>
        </div>

        {agents.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/50">
                <p className="text-slate-400 mb-4">You haven't purchased any agents yet.</p>
                <Link to="/categories" className="text-emerald-400 hover:text-emerald-300 font-medium">Browse Marketplace</Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map(agent => (
                    <div key={agent.id} className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden hover:border-emerald-500/30 transition-colors group">
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-12 w-12 rounded-lg bg-slate-900 flex items-center justify-center text-emerald-400 border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                                    {agent.icon_svg ? (
                                        <div dangerouslySetInnerHTML={{ __html: agent.icon_svg }} className="w-6 h-6" />
                                    ) : (
                                        <div className="w-6 h-6 bg-emerald-500/20 rounded-full" />
                                    )}
                                </div>
                                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                                    Active
                                </span>
                            </div>
                            <h3 className="text-lg font-medium text-slate-50 mb-2">{agent.name}</h3>
                            <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-1">{agent.description}</p>
                            <Link 
                                to="/workspace" 
                                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group-hover:border-emerald-500/30"
                            >
                                Open in Workspace
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
