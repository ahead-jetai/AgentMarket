class CreateAgents < ActiveRecord::Migration[8.1]
  def change
    create_table :agents do |t|
      t.string :name
      t.string :sku
      t.integer :price
      t.string :image_url
      t.text :description
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
