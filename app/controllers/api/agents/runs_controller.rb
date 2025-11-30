module Api
  module Agents
    class RunsController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :authenticate_user!

      AGENT_SLUG_TO_SKU = {
        "cofounder_brainstorm" => "GEN-AGENT-001"
      }

      def index
        sku = AGENT_SLUG_TO_SKU[params[:agent_slug]]
        unless sku
            render json: { error: "Unknown agent" }, status: :not_found
            return
        end
        
        agent = Agent.find_by(sku: sku)
        unless agent
            render json: { error: "Agent not found in DB" }, status: :not_found
            return
        end

        # Check Purchase
        unless current_user.team.agents.include?(agent)
            render json: { error: "Access denied. Please purchase this agent." }, status: :forbidden
            return
        end

        runs = current_user.team.agent_runs.where(agent: agent).order(created_at: :desc).limit(20)
        
        render json: { runs: runs }
      end

      def create
        sku = AGENT_SLUG_TO_SKU[params[:agent_slug]]
        unless sku
            render json: { error: "Unknown agent" }, status: :not_found
            return
        end
        
        agent = Agent.find_by(sku: sku)
        unless agent
             render json: { error: "Agent not found in DB" }, status: :not_found
             return
        end
        
        # Gating
        unless current_user.team.agents.include?(agent)
            render json: { error: "Access denied. Please purchase this agent." }, status: :forbidden
            return
        end

        # Create Run
        run = current_user.team.agent_runs.create!(
            agent: agent,
            status: "running",
            input_payload: run_params,
            output_payload: nil
        )

        # Execute (Sync for now)
        begin
            # Use the namespaced service
            service = ::Agents::CoFounderBrainAgent.new(run_params)
            result = service.run
            
            run.update!(
                status: "succeeded",
                output_payload: result
            )
        rescue => e
            run.update!(
                status: "failed",
                error_message: e.message
            )
        end

        render json: { run: run }
      end

      private

      def run_params
        params.permit(:idea_summary, :target_user, :stage, :focus).to_h
      end
    end
  end
end
