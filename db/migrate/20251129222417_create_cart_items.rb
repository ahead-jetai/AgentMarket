class CreateCartItems < ActiveRecord::Migration[8.1]
  def change
    create_table :cart_items do |t|
      t.string :session_id
      t.references :agent, null: false, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
