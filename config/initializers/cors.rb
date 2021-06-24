Rails.application.config.hosts << "*"
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://127.0.0.1:8080'
    resource '/api/*', headers: :any, methods: :post
  end
end