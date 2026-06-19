json.extract! course, :id, :title, :category, :created_at, :updated_at
json.lessons_count course.lessons_count
json.progress course.progress

json.lessons course.lessons do |lesson|
  json.extract! lesson, :id, :title, :completed, :course_id
end

json.url course_url(course, format: :json)
