module Api
  class PurchasesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authenticate_user!

    def create
      # Expects params[:agent_ids] or just assumes checking out the cart which I need to clear?
      # The issue says "When a user/team completes the fake checkout... Create a record"
      # In CheckoutPage, we have `newAgents` which are the purchased agents.
      # I should probably pass the agent IDs.
      
      agent_ids = params[:agent_ids]
      
      if agent_ids.present?
        agents = Agent.where(id: agent_ids)
        agents.each do |agent|
          AgentPurchase.find_or_create_by!(team: current_user.team, agent: agent)
        end
        
        # Also clear the cart
        # Cart logic is session based "cart_id". I might need to handle that if I want to be thorough.
        # But the prompt focuses on the Purchase Record.
        
        render json: { message: "Purchase successful", purchased_agent_ids: current_user.team.agent_ids }
      else
        render json: { error: "No agents provided" }, status: :unprocessable_entity
      end
    end
  end
end
