import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    return <div className="p-8 text-white">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-400 mb-8">Admin Dashboard</h1>

        {/* Metrics Section */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            <MetricCard title="Users" value={metrics.users_count} />
            <MetricCard title="Teams" value={metrics.teams_count} />
            <MetricCard title="Agents" value={metrics.agents_count} />
            <MetricCard title="Runs" value={metrics.agent_runs_count} />
            <MetricCard title="Sales" value={metrics.total_sales} />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === "revenue" ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Revenue Overview
            {activeTab === "revenue" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("database")}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === "database" ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Database Explorer
            {activeTab === "database" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === "revenue" && revenueStats && (
          <div className="space-y-8">
            {/* Top Level Revenue Stats */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Platform Revenue</h3>
              <p className="text-4xl font-bold text-emerald-400">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenueStats.total || 0)}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Purchases */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="text-lg font-semibold text-white">Recent Purchases</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950">
                      <tr>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase">Date</th>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase">Agent</th>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase">Team</th>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {revenueStats.recent_purchases.map((purchase) => (
                        <tr key={purchase.id} className="hover:bg-slate-800/50">
                          <td className="p-4 text-sm text-slate-300">
                            {new Date(purchase.purchased_at).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-sm text-emerald-400 font-medium">{purchase.agent_name}</td>
                          <td className="p-4 text-sm text-slate-300">{purchase.team_name}</td>
                          <td className="p-4 text-sm text-slate-200 text-right">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(purchase.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Agents */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden h-fit">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="text-lg font-semibold text-white">Top Selling Agents</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950">
                      <tr>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase">Agent</th>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase text-right">Sales</th>
                        <th className="p-4 text-xs font-medium text-slate-400 uppercase text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {revenueStats.top_agents.map((agent, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50">
                          <td className="p-4 text-sm text-emerald-400 font-medium">{agent.name}</td>
                          <td className="p-4 text-sm text-slate-300 text-right">{agent.sales_count}</td>
                          <td className="p-4 text-sm text-slate-200 text-right">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(agent.total_sales)}
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
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
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
                    <div className="flex items-center justify-center h-full text-slate-400">Loading table data...</div>
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

const MetricCard = ({ title, value }) => (
  <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
    <p className="text-2xl font-bold text-white mt-2">{value}</p>
  </div>
);
