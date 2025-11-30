class CreateAgentRuns < ActiveRecord::Migration[8.1]
  def change
    create_table :agent_runs do |t|
      t.references :team, null: false, foreign_key: true
      t.references :agent, null: false, foreign_key: true
      t.string :status
      t.json :input_payload
      t.json :output_payload
      t.text :error_message

      t.timestamps
    end
  end
end
