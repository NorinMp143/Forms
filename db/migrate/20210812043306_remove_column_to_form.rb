class RemoveColumnToForm < ActiveRecord::Migration[6.1]
  def change
    remove_column :forms, :user_id
  end
end
