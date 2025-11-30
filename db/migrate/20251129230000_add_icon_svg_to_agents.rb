class AddIconSvgToAgents < ActiveRecord::Migration[8.1]
  def change
    add_column :agents, :icon_svg, :text
  end
end
