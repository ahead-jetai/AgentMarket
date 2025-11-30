class Api::AgentsController < ApplicationController
  def show
    agent = Agent.includes(:category).find(params[:id])

    render json: {
      agent: {
        id: agent.id,
        name: agent.name,
        sku: agent.sku,
        price: agent.price,
        image_url: agent.image_url,
        description: agent.description,
        icon_svg: agent.icon_svg,
        category_name: agent.category.name
      }
    }
  end
end
