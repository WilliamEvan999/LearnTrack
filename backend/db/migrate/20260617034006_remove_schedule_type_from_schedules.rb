class RemoveScheduleTypeFromSchedules < ActiveRecord::Migration[8.1]
  def change
    remove_column :schedules, :schedule_type, :string
  end
end
