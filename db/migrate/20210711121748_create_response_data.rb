class CreateResponseData < ActiveRecord::Migration[6.1]
  def change
    create_table :response_data do |t|
      t.references :form, null: false, foreign_key: true
      t.references :field, null: false, foreign_key: true
      t.references :response, null: false, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end
