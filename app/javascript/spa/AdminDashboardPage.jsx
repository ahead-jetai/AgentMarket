import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

// Utility: format numbers as USD currency consistently across charts
const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value ?? 0
  );

export const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [tables, setTables] = useState([]);
  const [revenueStats, setRevenueStats] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("revenue");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => {
        if (res.status === 403) {
          navigate("/"); // Redirect if not admin
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setMetrics(data.metrics);
        setTables(data.tables);
        setRevenueStats(data.revenue);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch admin dashboard", err);
        setIsLoading(false);
      });
  }, [navigate]);

  const handleTableClick = (tableName) => {
    setSelectedTable(tableName);
    setIsTableLoading(true);
    setTableData(null);
    fetch(`/api/admin/table/${tableName}`)
      .then((res) => res.json())
      .then((data) => {
        setTableData(data.data);
        setIsTableLoading(false);
      })
      .catch((err) => {
        console.error(`Failed to fetch data for ${tableName}`, err);
        setIsTableLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 pt-24 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-400 mb-8 flex items-center gap-3">
          <span className="p-2 bg-emerald-500/10 rounded-lg">📊</span>
          Admin Dashboard
        </h1>

        {/* Metrics Section */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            <MetricCard title="Users" value={metrics.users_count} icon="👥" delay={0} />
            <MetricCard title="Teams" value={metrics.teams_count} icon="🏢" delay={100} />
            <MetricCard title="Agents" value={metrics.agents_count} icon="🤖" delay={200} />
            <MetricCard title="Runs" value={metrics.agent_runs_count} icon="🚀" delay={300} />
            <MetricCard title="Sales" value={metrics.total_sales} icon="💰" delay={400} />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`pb-4 px-4 text-sm font-medium transition-all relative ${
              activeTab === "revenue" ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Revenue Overview
            {activeTab === "revenue" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("database")}
            className={`pb-4 px-4 text-sm font-medium transition-all relative ${
              activeTab === "database" ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Database Explorer
            {activeTab === "database" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === "revenue" && revenueStats && (
          <div className="space-y-8 animate-slide-up">
            {/* Main Revenue Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Total Revenue</h3>
                    <p className="text-4xl font-bold text-emerald-400">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenueStats.total || 0)}
                    </p>
                  </div>
                  <div className="text-slate-500 text-sm">Last 30 Days</div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueStats.daily_revenue || []}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#64748b" 
                        tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                        tick={{fontSize: 12}}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        tickFormatter={(num) => `$${num}`}
                        tick={{fontSize: 12}}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                        activeDot={{ r: 6, strokeWidth: 0, fill: "#34d399" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart - Sales Distribution */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg flex flex-col">
                <h3 className="text-white text-lg font-semibold mb-6">Sales Distribution</h3>
                <div className="flex-1 min-h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueStats.top_agents}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="total_sales"
                      >
                        {revenueStats.top_agents.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                      <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                        iconType="circle"
                        formatter={(value) => <span className="text-slate-400 text-xs ml-1">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Agents Bar Chart */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg">
                <h3 className="text-white text-lg font-semibold mb-6">Top Performing Agents</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueStats.top_agents} layout="vertical" margin={{ left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                      <XAxis 
                        type="number" 
                        stroke="#64748b" 
                        tick={{fontSize: 12}} 
                        axisLine={false} 
                        tickLine={false}
                        tickFormatter={(v) => formatCurrency(v)}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        width={100} 
                        tick={{fontSize: 12}} 
                        axisLine={false} 
                        tickLine={false}
                      />
                      <Tooltip 
                        cursor={{fill: '#1e293b'}}
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                        formatter={(value, name) => [formatCurrency(value), "Total Sales"]}
                        separator=": "
                        labelFormatter={(label) => `Agent: ${label}`}
                      />
                      <Bar dataKey="total_sales" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                        <LabelList dataKey="total_sales" position="right" formatter={(v) => formatCurrency(v)} fill="#e2e8f0" fontSize={12} />
                        {revenueStats.top_agents.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Purchases Table */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-lg flex flex-col">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                </div>
                <div className="overflow-auto flex-1 max-h-[300px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950 sticky top-0 z-10">
                      <tr>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase">Date</th>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase">Agent</th>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {revenueStats.recent_purchases.map((purchase) => (
                        <tr key={purchase.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-4 text-sm text-slate-300">
                            {new Date(purchase.purchased_at).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-sm text-emerald-400 font-medium">{purchase.agent_name}</td>
                          <td className="p-4 text-sm text-slate-200 text-right">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(purchase.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Database View Content */}
        {activeTab === "database" && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-lg animate-fade-in">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-xl font-semibold text-white">Database View</h2>
              <p className="text-slate-400 text-sm mt-1">Select a table to view its records (limit 100).</p>
            </div>
            
            <div className="flex flex-col lg:flex-row h-[600px]">
              {/* Table List */}
              <div className="w-full lg:w-64 border-r border-slate-800 overflow-y-auto bg-slate-900/50">
                {tables.map((table) => (
                  <button
                    key={table}
                    onClick={() => handleTableClick(table)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      selectedTable === table
                        ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-l-2 border-transparent"
                    }`}
                  >
                    {table}
                  </button>
                ))}
              </div>

              {/* Table Data */}
              <div className="flex-1 overflow-hidden flex flex-col bg-slate-950">
                {selectedTable ? (
                  isTableLoading ? (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <div className="animate-pulse">Loading table data...</div>
                    </div>
                  ) : tableData && tableData.length > 0 ? (
                    <div className="overflow-auto h-full">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900 sticky top-0">
                          <tr>
                            {Object.keys(tableData[0]).map((key) => (
                              <th key={key} className="p-3 text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-slate-800 whitespace-nowrap">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {tableData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-900/50">
                              {Object.values(row).map((val, i) => (
                                <td key={i} className="p-3 text-sm text-slate-300 whitespace-nowrap">
                                  {val === null ? <span className="text-slate-600">null</span> : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-500">
                      {tableData ? "No records found in this table." : "Select a table"}
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    Select a table from the sidebar to view data
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, delay }) => (
  <div 
    className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 transform hover:-translate-y-1 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
    </div>
    <p className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">{value}</p>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{new Date(label).toLocaleDateString()}</p>
        <p className="text-emerald-400 font-bold text-lg">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-white font-medium mb-1">{payload[0].name}</p>
        <p className="text-emerald-400 font-bold">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payload[0].value)}
        </p>
        <p className="text-slate-400 text-xs mt-1">
          Sales: {payload[0].payload.sales_count}
        </p>
      </div>
    );
  }
  return null;
};
