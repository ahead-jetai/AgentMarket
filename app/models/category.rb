class Category < ApplicationRecord
  has_many :agents, dependent: :destroy

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
end
