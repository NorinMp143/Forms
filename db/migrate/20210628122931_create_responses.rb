class CreateResponses < ActiveRecord::Migration[6.1]
  def change
    create_table :responses do |t|
      t.string :value
      t.integer :counter
      t.integer :field_id
      t.references :form, null: false, foreign_key: true

      t.timestamps
    end
  end
end
