class Form < ApplicationRecord
  has_many :fields, dependent: :destroy
  has_many :responses, dependent: :destroy

  validates :name, presence: true
end
