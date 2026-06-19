    class Course < ApplicationRecord
    belongs_to :user
    has_many :lessons, dependent: :destroy

    validates :title, presence: true
    validates :category, presence: true

    def lessons_count
        lessons.count
    end

    def progress
        return 0 if lessons.count.zero?

        completed_lessons = lessons.where(completed: true).count

        ((completed_lessons.to_f / lessons.count) * 100).round
    end
    end 