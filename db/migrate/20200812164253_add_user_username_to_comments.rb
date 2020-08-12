class AddUserUsernameToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :user_username, :string
  end
end
