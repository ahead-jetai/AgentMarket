import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("agentmarket_user_email");
    if (!userEmail) {
      navigate("/signup");
      return;
    }
    setEmail(userEmail);

    const storedAgents = localStorage.getItem("agentmarket_purchased_agents");
    if (storedAgents) {
      setAgents(JSON.parse(storedAgents));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("agentmarket_user_email");
    localStorage.removeItem("agentmarket_user_password");
    navigate("/");
  };

  return (
    <div className="relative -mx-4 md:-mx-8 lg:-mx-12 -mt-4 md:-mt-6 lg:-mt-8 bg-gradient-to-b from-emerald-500/15 min-h-screen">
      <div className="relative w-full px-4 md:px-8 lg:px-12 pt-24 pb-20 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-slate-50">Dashboard</h1>
            <p className="text-slate-400">Welcome back, {email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-slate-400 hover:text-emerald-300"
          >
            Log out
          </button>
        </div>

        {agents.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-10 text-center">
            <p className="mb-4 text-lg text-slate-300">You haven’t added any agents yet.</p>
            <Link
              to="/"
              className="inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
            >
              Browse Agents
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="border-b border-slate-800 px-6 py-4">
              <h2 className="text-lg font-medium text-slate-50">Your Active Agents</h2>
            </div>
            <div className="divide-y divide-slate-800">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-6 p-6">
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-900 relative border border-slate-800/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900" />
                    {agent.icon_svg && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div
                          className="h-10 w-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                          dangerouslySetInnerHTML={{ __html: agent.icon_svg }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-50">{agent.name}</h3>
                    <p className="text-sm text-slate-400">{agent.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                      Active
                    </span>
                    <p className="text-slate-300 font-medium">${(agent.price / 100).toFixed(0)}/mo</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
