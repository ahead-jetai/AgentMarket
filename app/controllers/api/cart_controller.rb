class Api::CartController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    items = CartItem.includes(:agent).where(session_id: session.id.to_s)

    serialized_items = items.map do |item|
      agent = item.agent
      {
        id: item.id,
        agent_id: agent.id,
        sku: agent.sku,
        quantity: item.quantity,
        name: agent.name,
        price: agent.price,
        image_url: agent.image_url,
        icon_svg: agent.icon_svg,
        category_name: agent.category.name
      }
    end

    subtotal = serialized_items.sum { |item| item[:price] * item[:quantity] }

    render json: {
      items: serialized_items,
      subtotal: subtotal
    }
  end

  def destroy
    CartItem.where(session_id: session.id.to_s).destroy_all
    render json: { ok: true }
  end
end
