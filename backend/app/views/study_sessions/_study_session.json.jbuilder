json.extract! study_session, :id, :description, :started_at, :ended_at, :duration_seconds, :created_at, :updated_at
json.url study_session_url(study_session, format: :json)
