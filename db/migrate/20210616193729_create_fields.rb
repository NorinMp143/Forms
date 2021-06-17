class CreateFields < ActiveRecord::Migration[6.1]
  def change
    create_table :fields do |t|
      t.integer :order
      t.string :fieldtype
      t.string :label
      t.string :elementtype
      t.references :form, null: false, foreign_key: true

      t.timestamps
    end
  end
end
