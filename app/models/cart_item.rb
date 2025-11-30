class CartItem < ApplicationRecord
  belongs_to :agent

  validates :session_id, presence: true
  validates :quantity, numericality: { greater_than: 0 }
end
