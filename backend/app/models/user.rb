class User < ApplicationRecord
  has_secure_password

  has_many :courses, dependent: :destroy
  has_many :tasks, dependent: :destroy
  has_many :schedules, dependent: :destroy
  has_many :study_sessions, dependent: :destroy
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end