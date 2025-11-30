class Agent < ApplicationRecord
  belongs_to :category

  has_many :cart_items, dependent: :destroy

  validates :name, :sku, :price, :image_url, :description, presence: true
  validates :sku, uniqueness: true
end
