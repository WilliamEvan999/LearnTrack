json.extract! schedule, :id, :title, :schedule_date, :user_id, :created_at, :updated_at
json.url schedule_url(schedule, format: :json)
