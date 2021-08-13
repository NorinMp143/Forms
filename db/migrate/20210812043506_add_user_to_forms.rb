class AddUserToForms < ActiveRecord::Migration[6.1]
  def change
    add_reference :forms, :user, null: false, foreign_key: true
  end
end
