class CreateAgentPurchases < ActiveRecord::Migration[8.1]
  def change
    create_table :agent_purchases do |t|
      t.references :team, null: false, foreign_key: true
      t.references :agent, null: false, foreign_key: true

      t.timestamps
    end
  end
end
