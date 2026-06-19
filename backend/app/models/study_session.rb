class StudySession < ApplicationRecord
  belongs_to :user

  validates :description, presence: true
  validates :started_at, presence: true
  validates :ended_at, presence: true
  validates :duration_seconds, presence: true
end