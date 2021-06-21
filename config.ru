# This file is used by Rack-based servers to start the application.

require_relative "config/environment"

use Rack::Cors do
  allow do
    origins '*'
    resource 'api/save_form/responses', headers: :any, methods: :post
  end
end

run Rails.application
Rails.application.load_server
