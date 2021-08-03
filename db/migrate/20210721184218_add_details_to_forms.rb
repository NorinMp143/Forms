class AddDetailsToForms < ActiveRecord::Migration[6.1]
  def change
    add_column :forms, :description, :string, default: nil
    add_column :forms, :namecolor, :string, default: nil
    add_column :forms, :descolor, :string, default: nil
    add_column :forms, :titleunderlinecolor, :string, default: nil
    add_column :forms, :maxwidth, :string, default: nil
    add_column :forms, :borderradius, :string, default: nil
    add_column :forms, :boxshadow, :string, default: nil
    add_column :forms, :bgcolor, :string, default: nil
    add_column :forms, :fieldcolor, :string, default: nil
    add_column :forms, :fieldbrcolor, :string, default: nil
    add_column :forms, :btncolor, :string, default: nil
    add_column :forms, :btnbgcolor, :string, default: nil
  end
end
