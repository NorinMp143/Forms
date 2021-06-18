class CreateResponses < ActiveRecord::Migration[6.1]
  def change
    create_table :responses do |t|
      t.references :form, null: false, foreign_key: true
      t.string :name
      t.integer :mobile

      t.timestamps
    end
  end
end
