class Api::CartItemsController < ApplicationController
  # We still want a real cookie-backed session for cart tracking, but this
  # JSON endpoint is called via fetch() from the SPA without a CSRF token.
  # Using :null_session would give us a NullSession (no `session.id`),
  # so instead we keep the normal session and just skip the CSRF check.
  skip_before_action :verify_authenticity_token

  def create
    cart_item = CartItem.find_or_initialize_by(session_id: session_id, agent_id: params[:agent_id])
    cart_item.quantity = (cart_item.quantity || 0) + params.fetch(:quantity, 1).to_i
    cart_item.save!

    render json: { ok: true, id: cart_item.id }
  end

  def update
    cart_item = CartItem.find_by!(id: params[:id], session_id: session_id)
    cart_item.update!(quantity: params[:quantity].to_i)
    render json: { ok: true }
  end

  def destroy
    cart_item = CartItem.find_by!(id: params[:id], session_id: session_id)
    cart_item.destroy!
    render json: { ok: true }
  end

  private

  def session_id
    session.id.to_s
  end
end
