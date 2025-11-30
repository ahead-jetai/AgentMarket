import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AddedToCartModal = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
          className="relative mx-4 flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/30 bg-slate-900 p-8 shadow-[0_0_60px_rgba(16,185,129,0.3)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", duration: 0.6, bounce: 0.5 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="h-12 w-12 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-slate-50">Added to cart!</h3>
            <p className="mt-1 text-sm text-slate-400">Redirecting to cart...</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DEFAULT_FEATURE_CONFIG = {
  stack: ["Ruby on Rails", "React", "PostgreSQL", "Tailwind CSS", "Background workers"],
  features: [
    { icon: "🧠", label: "AI-powered decisioning tuned for your domain" },
    { icon: "📚", label: "RAG on your customer, product, and ops data" },
    { icon: "🛡️", label: "Guardrails, approvals, and human-in-the-loop controls" },
    { icon: "📊", label: "Monitoring dashboards for quality and performance" },
    { icon: "🔁", label: "Continuous learning from feedback and outcomes" },
    { icon: "⚙️", label: "Composable workflows you can adapt over time" }
  ],
  integrations: ["Slack", "Email", "CRM", "Ticketing", "Data warehouse"]
};

const FEATURE_CONFIG = {
  "RE-AGENT-001": {
    stack: ["Ruby on Rails","PostgreSQL","Tailwind CSS","React","Node.js workers"],
    features: [
      { icon: "🏡", label: "Multi-channel listing syndication (MLS, Zillow, Trulia)" },
      { icon: "🧠", label: "RAG on your past listings, calls, and email threads" },
      { icon: "🔎", label: "Lead scoring with explainable AI governance reports" },
      { icon: "🌐", label: "Cloud-native deployment with per-tenant isolation" },
      { icon: "🔐", label: "BYOK local models for sensitive seller data" },
      { icon: "📱", label: "Multimodal support for photos, floorplans & PDFs" },
      { icon: "📊", label: "Realtime performance dashboards and A/B tests" }
    ],
    integrations: ["Slack","Gmail","HubSpot","Salesforce","Zapier","ACP","MCP"]
  },
  "RE-AGENT-002": {
    stack: ["Ruby on Rails","Sidekiq","PostgreSQL","React","Python services"],
    features: [
      { icon: "🤝", label: "Conversational lead qualification with guardrails" },
      { icon: "📂", label: "RAG over call transcripts and intake forms" },
      { icon: "⚖️", label: "Configurable governance policies for scripts & tone" },
      { icon: "⏱️", label: "Smart routing and SLA-based follow ups" },
      { icon: "🧩", label: "Composable flows for SMS, email, and chat" },
      { icon: "🧪", label: "Built-in experiment framework for scripts" }
    ],
    integrations: ["Twilio","Slack","HubSpot","Salesforce","ACP"]
  },
  "SALES-AGENT-001": {
    stack: ["Node.js","TypeScript","Next.js","Ruby on Rails API","Redis"],
    features: [
      { icon: "✉️", label: "AI-personalized cold email generation at scale" },
      { icon: "🧠", label: "RAG on CRM notes, past wins & objections" },
      { icon: "📈", label: "Sequence analytics with reply & meeting-rate insights" },
      { icon: "🛡️", label: "Compliance checks and approval workflows" },
      { icon: "🌐", label: "Cloud-hosted with per-workspace configs" },
      { icon: "🔑", label: "BYOK model keys for OpenAI/Anthropic" }
    ],
    integrations: ["HubSpot","Salesforce","Pipedrive","Outreach","Salesloft","Gmail","Slack","GitHub"]
  },
  "DEV-AGENT-001": {
    stack: ["Ruby on Rails","React","TypeScript","Node.js","Python tooling"],
    features: [
      { icon: "💻", label: "Context-aware code completion across monorepos" },
      { icon: "📚", label: "RAG on your codebase, ADRs, and internal docs" },
      { icon: "🧪", label: "Test generation with coverage-aware suggestions" },
      { icon: "🛡️", label: "Secure coding guardrails & secret scanning" },
      { icon: "🔌", label: "Local BYOK models for on-prem/Git-only use" },
      { icon: "📦", label: "Multimodal diff review (code + diagrams)" }
    ],
    integrations: ["GitHub","GitLab","Bitbucket","Slack","Jira","ACP","MCP"]
  },
  "PROD-AGENT-001": {
    stack: ["Ruby on Rails","Sidekiq","PostgreSQL","React"],
    features: [
      { icon: "📥", label: "Priority inbox powered by intent classification" },
      { icon: "📄", label: "RAG on past email threads and knowledge bases" },
      { icon: "🤖", label: "Governed auto-replies with human-in-the-loop" },
      { icon: "🔔", label: "Smart escalation rules & quiet-hours policies" },
      { icon: "☁️", label: "Cloud-native with per-user data boundaries" },
      { icon: "🔑", label: "Supports BYOK and local LLM gateways" }
    ],
    integrations: ["Gmail","Outlook","Slack","Notion","Linear","Jira"]
  },
  "GEN-AGENT-003": {
    stack: ["Ruby on Rails","React","Tailwind CSS","Python research workers"],
    features: [
      { icon: "🔎", label: "Multimodal web + document search (text, PDF, slides)" },
      { icon: "📚", label: "RAG across your wikis, tickets, and drive docs" },
      { icon: "🧠", label: "Chain-of-thought reasoning with governance toggles" },
      { icon: "📑", label: "One-click research briefs and citation export" },
      { icon: "☁️", label: "Scales horizontally in cloud or hybrid setups" },
      { icon: "🔐", label: "Fine-grained access controls per data source" }
    ],
    integrations: ["Notion","Confluence","Slack","GitHub","Google Drive","ACP","MCP"]
  }
};

export const ProductPage = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [adding, setAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/agents/${id}`)
      .then((res) => res.json())
      .then((data) => setAgent(data.agent));
  }, [id]);

  const addToCart = () => {
    setAdding(true);
    fetch("/api/cart_items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent_id: agent.id, quantity: 1 }),
    })
      .then((res) => {
        if (!res.ok) return;
        return res.json();
      })
      .then(() => {
        setShowModal(true);
        setTimeout(() => {
          navigate("/cart");
        }, 1800);
      })
      .finally(() => setAdding(false));
  };

  if (!agent) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-10 w-10 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 mx-auto"
          />
          <p className="text-slate-400 text-sm">Loading agent…</p>
        </div>
      </div>
    );
  }

  const extra = FEATURE_CONFIG[agent.sku] || DEFAULT_FEATURE_CONFIG;

  return (
    <>
      {showModal && <AddedToCartModal />}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-300"
        >
          <span className="mr-1">←</span>
          Back
        </button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <img src={agent.image_url} alt={agent.name} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">{agent.category_name}</p>
            <h1 className="mt-1 text-3xl md:text-4xl font-semibold text-slate-50">{agent.name}</h1>
            <p className="mt-1 text-base text-slate-400">SKU: {agent.sku}</p>
          </div>
          <p className="text-base md:text-lg text-slate-200 leading-relaxed whitespace-pre-line">{agent.description}</p>

        {extra && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 text-xs">⚙️</span>
                Key AI capabilities
              </h2>
              <ul className="mt-2 grid gap-2 text-base text-slate-200 sm:grid-cols-2">
                {extra.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5 text-lg">{f.icon}</span>
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/10 text-sky-300 text-sm">🔌</span>
                  Integrations
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {extra.integrations.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/40 px-2.5 py-1 text-sm text-slate-200"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 text-purple-300 text-sm">🧱</span>
                  Built with
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {extra.stack.map((tech) => (
                    <li
                      key={tech}
                      className="inline-flex items-center rounded-full bg-slate-900/60 px-2.5 py-1 text-sm text-slate-200 ring-1 ring-slate-700/60"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

          <p className="text-3xl md:text-4xl font-semibold text-emerald-300">${(agent.price / 100).toFixed(0)} / month</p>
          <button
            type="button"
            onClick={addToCart}
            disabled={adding}
            className="inline-flex items-center rounded-md bg-emerald-500 px-5 py-2.5 text-base font-medium text-slate-950 shadow-sm hover:bg-emerald-400 disabled:opacity-70"
          >
            {adding ? "Adding…" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
