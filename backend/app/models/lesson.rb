class Lesson < ApplicationRecord
  belongs_to :course

  validates :title, presence: true
end