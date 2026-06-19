class CreateLessons < ActiveRecord::Migration[8.1]
  def change
    create_table :lessons do |t|
      t.string :title
      t.references :course, null: false, foreign_key: true
      t.boolean :completed, default: false
      t.timestamps
    end
  end
end