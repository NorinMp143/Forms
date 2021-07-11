class Response < ApplicationRecord
  belongs_to :form
  has_many :response_data, dependent: :destroy

end
