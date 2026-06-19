class Schedule < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :schedule_date, presence: true
end