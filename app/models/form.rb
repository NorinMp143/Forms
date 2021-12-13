class Form < ApplicationRecord
  belongs_to :user
  has_many :fields, dependent: :destroy
  has_many :responses, dependent: :destroy
  has_many :response_data, dependent: :destroy

  validates :name, presence: true
end
