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
    description: "Lists your properties across major marketplaces, manages inquiries, and routes qualified leads to your phone or CRM."
  },
  {
    name: "AI Real Estate Lead Qualifier",
    sku: "RE-AGENT-002",
    price: 39_900,
    category_slug: "real-estate",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Lead+Qualifier",
    description: "24/7 assistant that screens inbound buyer and renter leads, captures intent, and schedules showings automatically."
  },
  {
    name: "Cold Email Outreach Pro",
    sku: "SALES-AGENT-001",
    price: 29_900,
    category_slug: "sales-outreach",
    image_url: "https://placehold.co/600x400/020617/f97316?text=Cold+Email+Pro",
    description: "Scrapes LinkedIn for your ICP, crafts personalized cold emails, and schedules outreach campaigns on your behalf."
  },
  {
    name: "LinkedIn Scraper & Sequencer",
    sku: "SALES-AGENT-002",
    price: 25_900,
    category_slug: "sales-outreach",
    image_url: "https://placehold.co/600x400/0b1120/a855f7?text=LinkedIn+Sequencer",
    description: "Discovers target accounts, enriches profiles, and runs multi-touch outreach sequences across email and LinkedIn."
  },
  {
    name: "Sales Call Notes Summarizer",
    sku: "SALES-AGENT-003",
    price: 19_900,
    category_slug: "sales-outreach",
    image_url: "https://placehold.co/600x400/020617/22d3ee?text=Call+Summarizer",
    description: "Turns raw call recordings into structured notes, next steps, and CRM-ready fields within minutes."
  },
  {
    name: "Full-Stack Coding Copilot",
    sku: "DEV-AGENT-001",
    price: 5_900,
    category_slug: "developer-tools",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Coding+Copilot",
    description: "Pair-programming agent that writes boilerplate, refactors legacy code, and suggests tests across your stack."
  },
  {
    name: "Legacy Code Refactorer",
    sku: "DEV-AGENT-002",
    price: 8_900,
    category_slug: "developer-tools",
    image_url: "https://placehold.co/600x400/0f172a/facc15?text=Refactorer",
    description: "Analyzes sprawling codebases, proposes refactors, and generates pull requests for incremental modernization."
  },
  {
    name: "Bug Triage & Reproducer",
    sku: "DEV-AGENT-003",
    price: 9_900,
    category_slug: "developer-tools",
    image_url: "https://placehold.co/600x400/020617/f97316?text=Bug+Triage",
    description: "Reads error logs, replicates bugs in a sandbox, and suggests minimal patches developers can review and merge."
  },
  {
    name: "Personal Fitness Coach Agent",
    sku: "FIT-AGENT-001",
    price: 7_900,
    category_slug: "fitness-wellness",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Fitness+Coach",
    description: "Designs adaptive workout plans, tracks progress, and integrates with wearables to optimize your training."
  },
  {
    name: "Nutrition & Meal Planner Agent",
    sku: "FIT-AGENT-002",
    price: 6_900,
    category_slug: "fitness-wellness",
    image_url: "https://placehold.co/600x400/0b1120/f97316?text=Meal+Planner",
    description: "Builds weekly meal plans tailored to your macros, budget, and cooking time, complete with shopping lists."
  },
  {
    name: "Habit Builder & Accountability Agent",
    sku: "FIT-AGENT-003",
    price: 4_900,
    category_slug: "fitness-wellness",
    image_url: "https://placehold.co/600x400/0f172a/a855f7?text=Habit+Builder",
    description: "Creates routines, nudges you at the right time, and tracks streaks for fitness, sleep, and mindfulness."
  },
  {
    name: "Spreadsheet Automation Wizard",
    sku: "DATA-AGENT-001",
    price: 4_900,
    category_slug: "data-analytics",
    image_url: "https://placehold.co/600x400/020617/22d3ee?text=Sheet+Wizard",
    description: "Turns messy spreadsheets into clean dashboards, generates formulas, and automates recurring reporting."
  },
  {
    name: "Data Cleaning & Enrichment Agent",
    sku: "DATA-AGENT-002",
    price: 6_900,
    category_slug: "data-analytics",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Data+Cleaner",
    description: "Standardizes, deduplicates, and enriches large contact or transaction datasets using external APIs."
  },
  {
    name: "KPI Dashboard Builder",
    sku: "DATA-AGENT-003",
    price: 7_900,
    category_slug: "data-analytics",
    image_url: "https://placehold.co/600x400/0b1120/facc15?text=KPI+Dashboards",
    description: "Connects to your tools (CRM, billing, analytics) and builds live dashboards for your north-star metrics."
  },
  {
    name: "Inbox Triage & Reply Agent",
    sku: "PROD-AGENT-001",
    price: 3_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/020617/f97316?text=Inbox+Triage",
    description: "Sorts email, drafts smart replies, and escalates only what truly needs your attention."
  },
  {
    name: "Meeting Notes & Action Items Agent",
    sku: "PROD-AGENT-002",
    price: 4_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/020617/22d3ee?text=Meeting+Notes",
    description: "Joins calls as a silent attendee, captures decisions, and assigns action items with due dates."
  },
  {
    name: "Project Planner & Roadmap Agent",
    sku: "PROD-AGENT-003",
    price: 5_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/0f172a/a855f7?text=Roadmap+Agent",
    description: "Breaks down big initiatives into sprints, timelines, and tasks that sync with your PM tool."
  },
  {
    name: "Startup Co-Founder Brainstorm Agent",
    sku: "GEN-AGENT-001",
    price: 12_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/020617/facc15?text=Co-Founder+Brain",
    description: "Helps brainstorm ideas, validate markets, and structure pitch decks for your next venture."
  },
  {
    name: "Customer Support Triage Bot",
    sku: "GEN-AGENT-002",
    price: 9_900,
    category_slug: "sales-outreach",
    image_url: "https://placehold.co/600x400/020617/22c55e?text=Support+Bot",
    description: "Categorizes incoming tickets, suggests responses, and escalates high-priority issues automatically."
  },
  {
    name: "AI Research Assistant",
    sku: "GEN-AGENT-003",
    price: 6_900,
    category_slug: "productivity",
    image_url: "https://placehold.co/600x400/0b1120/22c55e?text=Research+Assistant",
    description: "Scans the web and your knowledge base to summarize topics, compare options, and produce research briefs."
  }
]

agents.each do |attrs|
  category = category_records.fetch(categories.find { |c| c[:slug] == attrs[:category_slug] })

  Agent.find_or_create_by!(sku: attrs[:sku]) do |agent|
    agent.name = attrs[:name]
    agent.price = attrs[:price]
    agent.image_url = attrs[:image_url]
    agent.description = attrs[:description]
    agent.category = category
  end
end

puts "Seeded #{Category.count} categories and #{Agent.count} agents."
