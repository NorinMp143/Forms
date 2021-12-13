class FixResponseTable < ActiveRecord::Migration[6.1]
  def change
    remove_columns :responses, :counter, :field_id, :value
  end
end
