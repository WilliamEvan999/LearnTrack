class CreateSchedules < ActiveRecord::Migration[8.0]
  def change
    create_table :schedules do |t|
      t.string :title
      t.string :schedule_type
      t.date :schedule_date
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end