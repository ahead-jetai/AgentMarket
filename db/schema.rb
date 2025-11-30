# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_11_30_185231) do
  create_table "agent_purchases", force: :cascade do |t|
    t.integer "agent_id", null: false
    t.datetime "created_at", null: false
    t.integer "team_id", null: false
    t.datetime "updated_at", null: false
    t.index ["agent_id"], name: "index_agent_purchases_on_agent_id"
    t.index ["team_id"], name: "index_agent_purchases_on_team_id"
  end

  create_table "agent_runs", force: :cascade do |t|
    t.integer "agent_id", null: false
    t.datetime "created_at", null: false
    t.text "error_message"
    t.json "input_payload"
    t.json "output_payload"
    t.string "status"
    t.integer "team_id", null: false
    t.datetime "updated_at", null: false
    t.index ["agent_id"], name: "index_agent_runs_on_agent_id"
    t.index ["team_id"], name: "index_agent_runs_on_team_id"
  end

  create_table "agents", force: :cascade do |t|
    t.integer "category_id", null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.text "icon_svg"
    t.string "image_url"
    t.string "name"
    t.integer "price"
    t.string "sku"
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_agents_on_category_id"
  end

  create_table "cart_items", force: :cascade do |t|
    t.integer "agent_id", null: false
    t.datetime "created_at", null: false
    t.integer "quantity"
    t.string "session_id"
    t.datetime "updated_at", null: false
    t.index ["agent_id"], name: "index_cart_items_on_agent_id"
  end

  create_table "categories", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.string "slug"
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_categories_on_slug", unique: true
  end

  create_table "teams", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.integer "team_id", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_users_on_team_id"
  end

  add_foreign_key "agent_purchases", "agents"
  add_foreign_key "agent_purchases", "teams"
  add_foreign_key "agent_runs", "agents"
  add_foreign_key "agent_runs", "teams"
  add_foreign_key "agents", "categories"
  add_foreign_key "cart_items", "agents"
  add_foreign_key "users", "teams"
end
