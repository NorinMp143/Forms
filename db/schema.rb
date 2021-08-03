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

ActiveRecord::Schema.define(version: 2021_07_21_184218) do

  create_table "fields", force: :cascade do |t|
    t.integer "order"
    t.string "fieldtype"
    t.string "label"
    t.string "elementtype"
    t.integer "form_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["form_id"], name: "index_fields_on_form_id"
  end

  create_table "forms", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "description"
    t.string "namecolor"
    t.string "descolor"
    t.string "titleunderlinecolor"
    t.string "maxwidth"
    t.string "borderradius"
    t.string "boxshadow"
    t.string "bgcolor"
    t.string "fieldcolor"
    t.string "fieldbrcolor"
    t.string "btncolor"
    t.string "btnbgcolor"
  end

  create_table "response_data", force: :cascade do |t|
    t.integer "form_id", null: false
    t.integer "field_id", null: false
    t.integer "response_id", null: false
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["field_id"], name: "index_response_data_on_field_id"
    t.index ["form_id"], name: "index_response_data_on_form_id"
    t.index ["response_id"], name: "index_response_data_on_response_id"
  end

  create_table "responses", force: :cascade do |t|
    t.integer "form_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["form_id"], name: "index_responses_on_form_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "fields", "forms"
  add_foreign_key "response_data", "fields"
  add_foreign_key "response_data", "forms"
  add_foreign_key "response_data", "responses"
  add_foreign_key "responses", "forms"
end
