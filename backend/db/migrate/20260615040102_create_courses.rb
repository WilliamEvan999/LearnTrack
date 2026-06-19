class CreateCourses < ActiveRecord::Migration[8.1]
  def change
    create_table :courses do |t|
      t.string :title
      t.string :category
      t.references :user, foreign_key: true, null: false
      t.timestamps
    end
  end
end