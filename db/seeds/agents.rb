categories = [
  { name: "Real Estate", slug: "real-estate" },
  { name: "Sales & Outreach", slug: "sales-outreach" },
  { name: "Developer Tools", slug: "developer-tools" },
  { name: "Productivity", slug: "productivity" },
  { name: "Fitness & Wellness", slug: "fitness-wellness" },
  { name: "Data & Analytics", slug: "data-analytics" }
]

category_records = categories.index_with do |attrs|
  Category.find_or_create_by!(slug: attrs[:slug]) do |cat|
    cat.name = attrs[:name]
  end
end

agents = [
  {
    name: "AI Real Estate Listing Agent",
    sku: "RE-AGENT-001",
    price: 49_900,
    category_slug: "real-estate",
    image_url: "https://placehold.co/600x400/0f172a/0ea5e9?text=Real+Estate+Agent",
    description: "Lists your properties across major marketplaces, manages inquiries, and routes qualified leads to your phone or CRM.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><path d="M24 6L8 16v16c0 2.2 1.8 4 4 4h8v-12h8v12h8c2.2 0 4-1.8 4-4V16L24 6z" fill="currentColor" opacity="0.2"/><circle cx="24" cy="12" r="2" fill="currentColor"/><circle cx="16" cy="20" r="1.5" fill="currentColor"/><circle cx="32" cy="20" r="1.5" fill="currentColor"/><circle cx="24" cy="28" r="1.5" fill="currentColor"/><path d="M24 6L8 16v16c0 2.2 1.8 4 4 4h8v-12h8v12h8c2.2 0 4-1.8 4-4V16L24 6z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M14 24l3 3 6-6" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    name: "AI Real Estate Lead Qualifier",
    sku: "RE-AGENT-002",
    price: 39_900,
    category_slug: "real-estate",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Lead+Qualifier",
    description: "24/7 assistant that screens inbound buyer and renter leads, captures intent, and schedules showings automatically.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" fill="currentColor" opacity="0.1"/><path d="M24 14v-4m0 28v-4m10-10h4m-28 0h4" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="currentColor"/><path d="M32 18l2-2m-20 2l-2-2m20 16l2 2m-20-2l-2 2" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="17" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="31" cy="17" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="17" cy="31" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="31" cy="31" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>'
  },
  {
    name: "Cold Email Outreach Pro",
    sku: "SALES-AGENT-001",
    price: 29_900,
    category_slug: "sales-outreach",
    image_url: "https://placehold.co/600x400/020617/f97316?text=Cold+Email+Pro",
    description: "Scrapes LinkedIn for your ICP, crafts personalized cold emails, and schedules outreach campaigns on your behalf.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="14" width="32" height="22" rx="2" fill="currentColor" opacity="0.1"/><path d="M8 16l16 10 16-10" stroke="currentColor" stroke-width="2"/><rect x="8" y="14" width="32" height="22" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="38" cy="18" r="6" fill="currentColor"/><path d="M36 18l1.5 1.5 3-3" stroke="white" stroke-width="1.5"/><path d="M14 24h10m-10 4h8" stroke="currentColor" stroke-width="1.5" opacity="0.5"/></svg>'
  },
  {
    name: "LinkedIn Scraper & Sequencer",
    sku: "SALES-AGENT-002",
    price: 25_900,
    category_slug: "sales-outreach",
    image_url: "https://placehold.co/600x400/0b1120/a855f7?text=LinkedIn+Sequencer",
    description: "Discovers target accounts, enriches profiles, and runs multi-touch outreach sequences across email and LinkedIn.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="12" r="4" fill="currentColor"/><circle cx="12" cy="28" r="3" fill="currentColor" opacity="0.5"/><circle cx="24" cy="36" r="3" fill="currentColor" opacity="0.5"/><circle cx="36" cy="28" r="3" fill="currentColor" opacity="0.5"/><path d="M24 16v16M20 33l-6-4m10-1l6-4m-18 4l6-4" stroke="currentColor" stroke-width="2"/><rect x="10" y="6" width="28" height="8" rx="1" fill="currentColor" opacity="0.1"/><path d="M16 20h16M16 24h12" stroke="currentColor" stroke-width="1.5" opacity="0.3"/></svg>'
  },
  {
    name: "Sales Call Notes Summarizer",
    sku: "SALES-AGENT-003",
    price: 19_900,
    category_slug: "sales-outreach",
    image_url: "https://placehold.co/600x400/020617/22d3ee?text=Call+Summarizer",
    description: "Turns raw call recordings into structured notes, next steps, and CRM-ready fields within minutes.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><path d="M12 10h24v28H12z" fill="currentColor" opacity="0.1"/><path d="M12 10h24v28H12z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="24" cy="18" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor" opacity="0.3"/><path d="M18 26c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" stroke-width="1.5"/><path d="M16 32h16M16 36h12" stroke="currentColor" stroke-width="1.5"/><rect x="32" y="8" width="8" height="12" rx="1" fill="currentColor" opacity="0.2"/><path d="M34 12h4m-4 4h4" stroke="currentColor" stroke-width="1"/></svg>'
  },
  {
    name: "Full-Stack Coding Copilot",
    sku: "DEV-AGENT-001",
    price: 5_900,
    category_slug: "developer-tools",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Coding+Copilot",
    description: "Pair-programming agent that writes boilerplate, refactors legacy code, and suggests tests across your stack.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="28" rx="2" fill="currentColor" opacity="0.1"/><rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16 20l-4 4 4 4m8-8l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="30" cy="24" r="1.5" fill="currentColor"/><circle cx="34" cy="24" r="1.5" fill="currentColor"/><path d="M12 16h24" stroke="currentColor" stroke-width="1.5" opacity="0.3"/><rect x="10" y="12" width="4" height="2" rx="1" fill="currentColor" opacity="0.5"/></svg>'
  },
  {
    name: "Legacy Code Refactorer",
    sku: "DEV-AGENT-002",
    price: 8_900,
    category_slug: "developer-tools",
    image_url: "https://placehold.co/600x400/0f172a/facc15?text=Refactorer",
    description: "Analyzes sprawling codebases, proposes refactors, and generates pull requests for incremental modernization.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><path d="M12 12h10v10H12z" fill="currentColor" opacity="0.2"/><path d="M26 26h10v10H26z" fill="currentColor" opacity="0.2"/><path d="M12 12h10v10H12zm14 14h10v10H26z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M22 17h4m-4 9v4" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="17" r="2" fill="currentColor"/><circle cx="31" cy="31" r="2" fill="currentColor"/><path d="M30 16l6-6m-6 0l6 6" stroke="currentColor" stroke-width="1.5" opacity="0.5"/></svg>'
  },
  {
    name: "Bug Triage & Reproducer",
    sku: "DEV-AGENT-003",
    price: 9_900,
    category_slug: "developer-tools",
    image_url: "https://placehold.co/600x400/020617/f97316?text=Bug+Triage",
    description: "Reads error logs, replicates bugs in a sandbox, and suggests minimal patches developers can review and merge.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="10" fill="currentColor" opacity="0.1"/><circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M24 19v6m0 3h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 24h-4m28 0h-4M24 14v-4m0 28v-4" stroke="currentColor" stroke-width="1.5"/><path d="M17 17l-3-3m20 3l3-3m-20 20l-3 3m20-3l3 3" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    name: "Personal Fitness Coach Agent",
    sku: "FIT-AGENT-001",
    price: 7_900,
    category_slug: "fitness-wellness",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Fitness+Coach",
    description: "Designs adaptive workout plans, tracks progress, and integrates with wearables to optimize your training.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="14" fill="currentColor" opacity="0.1"/><path d="M16 24h16M24 16v16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="16" cy="24" r="3" fill="currentColor"/><circle cx="32" cy="24" r="3" fill="currentColor"/><circle cx="24" cy="16" r="3" fill="currentColor"/><circle cx="24" cy="32" r="3" fill="currentColor"/><path d="M20 20l-4-4m8 0l4-4m-8 16l-4 4m8 0l4 4" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    name: "Nutrition & Meal Planner Agent",
    sku: "FIT-AGENT-002",
    price: 6_900,
    category_slug: "fitness-wellness",
    image_url: "https://placehold.co/600x400/0b1120/f97316?text=Meal+Planner",
    description: "Builds weekly meal plans tailored to your macros, budget, and cooking time, complete with shopping lists.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="24" cy="24" r="12" fill="currentColor" opacity="0.1"/><path d="M24 12v4m0 16v4m12-12h-4m-16 0h-4" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="6" stroke="currentColor" stroke-width="2" fill="none"/><path d="M19 19l-2-2m14 0l2-2m-14 14l-2 2m14 0l2 2" stroke="currentColor" stroke-width="1.5"/><circle cx="24" cy="24" r="2" fill="currentColor"/></svg>'
  },
  {
    name: "Habit Builder & Accountability Agent",
    sku: "FIT-AGENT-003",
    price: 4_900,
    category_slug: "fitness-wellness",
    image_url: "https://placehold.co/600x400/0f172a/a855f7?text=Habit+Builder",
    description: "Creates routines, nudges you at the right time, and tracks streaks for fitness, sleep, and mindfulness.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="10" width="28" height="28" rx="2" fill="currentColor" opacity="0.1"/><rect x="10" y="10" width="28" height="28" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M18 24l4 4 8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="34" cy="14" r="4" fill="currentColor"/><path d="M34 12v4" stroke="white" stroke-width="1.5"/></svg>'
  },
  {
    name: "Spreadsheet Automation Wizard",
    sku: "DATA-AGENT-001",
    price: 4_900,
    category_slug: "data-analytics",
    image_url: "https://placehold.co/600x400/020617/22d3ee?text=Sheet+Wizard",
    description: "Turns messy spreadsheets into clean dashboards, generates formulas, and automates recurring reporting.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="10" width="32" height="28" rx="2" fill="currentColor" opacity="0.1"/><rect x="8" y="10" width="32" height="28" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 18h32M8 26h32M18 10v28M28 10v28" stroke="currentColor" stroke-width="1.5"/><path d="M22 22l-2 2 2 2m6-4l2 2-2 2" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    name: "Data Cleaning & Enrichment Agent",
    sku: "DATA-AGENT-002",
    price: 6_900,
    category_slug: "data-analytics",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Data+Cleaner",
    description: "Standardizes, deduplicates, and enriches large contact or transaction datasets using external APIs.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="12" width="36" height="24" rx="2" fill="currentColor" opacity="0.1"/><rect x="6" y="12" width="36" height="24" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 20h8m-8 6h12m-12 6h10" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><circle cx="34" cy="24" r="6" fill="currentColor"/><path d="M31 24l2 2 4-4" stroke="white" stroke-width="1.5"/></svg>'
  },
  {
    name: "KPI Dashboard Builder",
    sku: "DATA-AGENT-003",
    price: 7_900,
    category_slug: "data-analytics",
    image_url: "https://placehold.co/600x400/0b1120/facc15?text=KPI+Dashboards",
    description: "Connects to your tools (CRM, billing, analytics) and builds live dashboards for your north-star metrics.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="28" rx="2" fill="currentColor" opacity="0.05"/><rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 30v-8m8 8v-14m8 14v-10m8 10v-16m8 16v-12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="22" r="2" fill="currentColor"/><circle cx="20" cy="16" r="2" fill="currentColor"/><circle cx="28" cy="20" r="2" fill="currentColor"/><circle cx="36" cy="14" r="2" fill="currentColor"/></svg>'
  },
  {
    name: "Inbox Triage & Reply Agent",
    sku: "PROD-AGENT-001",
    price: 3_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/020617/f97316?text=Inbox+Triage",
    description: "Sorts email, drafts smart replies, and escalates only what truly needs your attention.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="14" width="32" height="22" rx="2" fill="currentColor" opacity="0.1"/><rect x="8" y="14" width="32" height="22" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M14 22h20m-20 4h16m-16 4h12" stroke="currentColor" stroke-width="1.5" opacity="0.4"/><circle cx="36" cy="20" r="6" fill="currentColor"/><path d="M34 20h4m-2-2v4" stroke="white" stroke-width="1.5"/></svg>'
  },
  {
    name: "Meeting Notes & Action Items Agent",
    sku: "PROD-AGENT-002",
    price: 4_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/020617/22d3ee?text=Meeting+Notes",
    description: "Joins calls as a silent attendee, captures decisions, and assigns action items with due dates.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="8" width="28" height="32" rx="2" fill="currentColor" opacity="0.1"/><rect x="10" y="8" width="28" height="32" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16 16h16m-16 6h14m-14 6h12m-12 6h10" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><circle cx="34" cy="30" r="8" fill="currentColor"/><path d="M30 30l2 2 4-4" stroke="white" stroke-width="1.5"/></svg>'
  },
  {
    name: "Project Planner & Roadmap Agent",
    sku: "PROD-AGENT-003",
    price: 5_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/0f172a/a855f7?text=Roadmap+Agent",
    description: "Breaks down big initiatives into sprints, timelines, and tasks that sync with your PM tool.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><path d="M6 24h36" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="24" r="4" fill="currentColor"/><circle cx="24" cy="24" r="4" fill="currentColor"/><circle cx="36" cy="24" r="4" fill="currentColor"/><path d="M12 20v-8h6v8m6-8v-4h6v4m6 0v-6h6v6" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="28" width="4" height="8" rx="1" fill="currentColor" opacity="0.3"/><rect x="22" y="28" width="4" height="10" rx="1" fill="currentColor" opacity="0.3"/><rect x="34" y="28" width="4" height="6" rx="1" fill="currentColor" opacity="0.3"/></svg>'
  },
  {
    name: "Startup Co-Founder Brainstorm Agent",
    sku: "GEN-AGENT-001",
    price: 12_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/020617/facc15?text=Co-Founder+Brain",
    description: "Helps brainstorm ideas, validate markets, and structure pitch decks for your next venture.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="20" r="8" fill="currentColor" opacity="0.1"/><circle cx="24" cy="20" r="8" stroke="currentColor" stroke-width="2" fill="none"/><path d="M24 12v-4m6 6l3-3m-3 9h4m-13-6l-3-3m-3 9h-4" stroke="currentColor" stroke-width="2"/><path d="M16 28h16l-4 12h-8l-4-12z" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="2"/><circle cx="20" cy="20" r="1.5" fill="currentColor"/><circle cx="28" cy="20" r="1.5" fill="currentColor"/></svg>'
  },
  {
    name: "Customer Support Triage Bot",
    sku: "GEN-AGENT-002",
    price: 9_900,
    category_slug: "sales-outreach",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Support+Bot",
    description: "Categorizes incoming tickets, suggests responses, and escalates high-priority issues automatically.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="22" r="12" fill="currentColor" opacity="0.1"/><circle cx="24" cy="22" r="12" stroke="currentColor" stroke-width="2" fill="none"/><path d="M19 20h2m4 0h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18 26c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" stroke-width="2"/><path d="M14 18c-4 0-6-3-6-6m34 6c4 0 6-3 6-6" stroke="currentColor" stroke-width="2"/><rect x="18" y="36" width="12" height="6" rx="1" fill="currentColor" opacity="0.3"/></svg>'
  },
  {
    name: "AI Research Assistant",
    sku: "GEN-AGENT-003",
    price: 6_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/0b1120/22c55e?text=Research+Assistant",
    description: "Scans the web and your knowledge base to summarize topics, compare options, and produce research briefs.",
    icon_svg: '<svg viewBox="0 0 48 48" fill="none"><circle cx="20" cy="20" r="12" fill="currentColor" opacity="0.1"/><circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="2" fill="none"/><path d="M28 28l8 8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="36" r="4" fill="currentColor"/><path d="M16 20h8m-4-4v8" stroke="currentColor" stroke-width="2"/></svg>'
  }
]

agents.each do |attrs|
  category = category_records.fetch(categories.find { |c| c[:slug] == attrs[:category_slug] })

  Agent.find_or_create_by!(sku: attrs[:sku]) do |agent|
    agent.name = attrs[:name]
    agent.price = attrs[:price]
    agent.image_url = attrs[:image_url]
    agent.description = attrs[:description]
    agent.icon_svg = attrs[:icon_svg]
    agent.category = category
  end
end

puts "Seeded #{Category.count} categories and #{Agent.count} agents."
