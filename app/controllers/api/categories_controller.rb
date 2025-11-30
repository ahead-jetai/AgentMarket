class Api::CategoriesController < ApplicationController
  def show
    category = Category.find_by!(slug: params[:slug])
    agents = category.agents

    render json: {
      category: {
        name: category.name,
        slug: category.slug,
        description: "AI agents specialized for #{category.name.downcase} workflows"
      },
      agents: agents.map do |agent|
        {
          id: agent.id,
          name: agent.name,
          price: agent.price,
          image_url: agent.image_url,
          short_description: agent.description.truncate(80)
        }
      end
    }
  end
end
