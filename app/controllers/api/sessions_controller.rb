module Api
  class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
      user = User.find_or_create_by!(email: params[:email]) do |u|
        # Assign a default team if new user
        u.team = Team.first || Team.create!(name: "Default Team")
      end
      session[:user_id] = user.id
      render json: { user: user, team: user.team }
    end

    def show
      if current_user
        render json: {
          user: current_user,
          team: current_user.team,
          purchased_agent_ids: current_user.team.agent_ids,
          purchased_agents: current_user.team.agents.map do |agent|
            {
              id: agent.id,
              name: agent.name,
              sku: agent.sku,
              category: agent.category.name,
              price: agent.price,
              image_url: agent.image_url,
              icon_svg: agent.icon_svg,
              description: agent.description
            }
          end
        }
      else
        render json: { user: nil }, status: :unauthorized
      end
    end

    def destroy
      session[:user_id] = nil
      render json: { message: "Logged out" }
    end
  end
end
