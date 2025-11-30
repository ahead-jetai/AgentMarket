import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [purchasedAgents, setPurchasedAgents] = useState([]);

  useEffect(() => {
    if (location.state && location.state.purchasedAgents) {
      setPurchasedAgents(location.state.purchasedAgents);
    } else {
      const storedAgents = localStorage.getItem("agentmarket_purchased_agents");
      if (storedAgents) {
        setPurchasedAgents(JSON.parse(storedAgents));
      }
    }
  }, [location.state]);

  const handleDashboardClick = () => {
    const email = localStorage.getItem("agentmarket_user_email");
    if (email) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="relative -mx-4 md:-mx-8 lg:-mx-12 -mt-4 md:-mt-6 lg:-mt-8 bg-gradient-to-b from-emerald-500/15 min-h-screen">
      <div className="relative w-full px-4 md:px-8 lg:px-12 pt-24 pb-20 flex flex-col items-center justify-center min-h-[80vh] space-y-8 text-center">
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-50">Order Confirmed!</h1>
          <p className="text-lg text-slate-400">You’re all set. Your agents are ready to be deployed.</p>
        </div>

        <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-950/60 p-6 text-left">
          <h2 className="mb-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Purchased Agents</h2>
          <div className="divide-y divide-slate-800">
            {purchasedAgents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 shrink-0 overflow-hidden rounded bg-slate-900 relative border border-slate-800/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900" />
                    {agent.icon_svg && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div
                          className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                          dangerouslySetInnerHTML={{ __html: agent.icon_svg }}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-50">{agent.name}</p>
                    <p className="text-xs text-slate-400">{agent.category}</p>
                  </div>
                </div>
                <p className="text-slate-300">${(agent.price / 100).toFixed(0)}/mo</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleDashboardClick}
          className="rounded-md bg-emerald-500 px-8 py-3 text-base font-medium text-slate-950 shadow-lg hover:bg-emerald-400"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};
