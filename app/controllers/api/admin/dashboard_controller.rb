module Api
  module Admin
    class DashboardController < ApplicationController
      before_action :require_admin

      def index
        tables = ActiveRecord::Base.connection.tables
        
        # Revenue Stats
        total_revenue = AgentPurchase.joins(:agent).sum('agents.price') / 100.0
        
        recent_purchases = AgentPurchase.includes(:agent, :team)
                                        .order(created_at: :desc)
                                        .limit(50)
                                        .map do |purchase|
          {
            id: purchase.id,
            agent_name: purchase.agent.name,
            team_name: purchase.team.name,
            price: purchase.agent.price / 100.0,
            purchased_at: purchase.created_at
          }
        end

        top_agents = Agent.joins(:agent_purchases)
                          .group('agents.id')
                          .select('agents.name, COUNT(agent_purchases.id) as sales_count, SUM(agents.price) as total_sales')
                          .order('total_sales DESC')
                          .limit(5)
                          .map do |agent|
                            {
                              name: agent.name,
                              sales_count: agent.sales_count,
                              total_sales: agent.total_sales / 100.0
                            }
                          end

        metrics = {
          users_count: User.count,
          teams_count: Team.count,
          agents_count: Agent.count,
          agent_runs_count: AgentRun.count,
          total_sales: AgentPurchase.count,
          total_revenue: total_revenue
        }

        render json: {
          metrics: metrics,
          revenue: {
            total: total_revenue,
            recent_purchases: recent_purchases,
            top_agents: top_agents
          },
          tables: tables
        }
      end

      def table_data
        table_name = params[:table_name]
        # Safety check to prevent SQL injection or accessing system tables if any
        if ActiveRecord::Base.connection.tables.include?(table_name)
          # Limit to 100 rows for performance, maybe add pagination later if needed
          data = ActiveRecord::Base.connection.execute("SELECT * FROM #{table_name} LIMIT 100")
          render json: { table: table_name, data: data }
        else
          render json: { error: "Table not found" }, status: :not_found
        end
      end

      private

      def require_admin
        unless current_user&.admin?
          render json: { error: "Unauthorized" }, status: :forbidden
        end
      end
    end
  end
end
