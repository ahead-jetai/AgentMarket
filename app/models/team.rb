class Team < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :agent_purchases, dependent: :destroy
  has_many :agents, through: :agent_purchases
  has_many :agent_runs, dependent: :destroy
end
