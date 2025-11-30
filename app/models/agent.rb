class Agent < ApplicationRecord
  belongs_to :category

  has_many :cart_items, dependent: :destroy
  has_many :agent_purchases, dependent: :destroy
  has_many :teams, through: :agent_purchases
  has_many :agent_runs, dependent: :destroy

  validates :name, :sku, :price, :image_url, :description, presence: true
  validates :sku, uniqueness: true
end
