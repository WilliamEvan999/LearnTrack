class CreateStudySessions < ActiveRecord::Migration[8.0]
  def change
    create_table :study_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :description, null: false
      t.datetime :started_at, null: false
      t.datetime :ended_at, null: false
      t.integer :duration_seconds, null: false
      t.timestamps
    end
  end
end