class Api::CartController < ApplicationController
  def show
    items = CartItem.includes(:agent).where(session_id: session.id.to_s)

    serialized_items = items.map do |item|
      agent = item.agent
      {
        id: item.id,
        quantity: item.quantity,
        name: agent.name,
        price: agent.price,
        image_url: agent.image_url,
        category_name: agent.category.name
      }
    end

    subtotal = serialized_items.sum { |item| item[:price] * item[:quantity] }

    render json: {
      items: serialized_items,
      subtotal: subtotal
    }
  end
end
