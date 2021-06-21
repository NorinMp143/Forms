class Form < ApplicationRecord
  has_many :fields
  has_many :responses

  validates :name, presence: true
end
