class ResponseDatum < ApplicationRecord
  belongs_to :form
  belongs_to :field
  belongs_to :response
end
