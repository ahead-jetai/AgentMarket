class Api::HomeController < ApplicationController
  def index
    featured_agents = Agent.limit(4).includes(:category)
    categories = Category.left_joins(:agents)
                         .select("categories.*, COUNT(agents.id) AS agents_count")
                         .group("categories.id")

    render json: {
      featured_agents: featured_agents.map do |agent|
        {
          id: agent.id,
          name: agent.name,
          price: agent.price,
          image_url: agent.image_url,
          category_name: agent.category.name,
          short_description: agent.description.truncate(80)
        }
      end,
      categories: categories.map do |category|
        {
          name: category.name,
          slug: category.slug,
          tagline: "AI agents for #{category.name.downcase} teams",
          agent_count: category.read_attribute(:agents_count)
        }
      end
    }
  end
end
