Rails.application.routes.draw do
  
  devise_for :users
  namespace :api do
    resources :forms do
      resources :fields
      resources :responses, controller: 'save_form/responses'
    end
    namespace :save_form do
      resources :responses
    end
    post 'embed/forms/:id', controller: 'save_form/responses', action: 'display'
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  post 'static/user_details', controller: 'static', action: 'user_details'
  # root 'static#index'
  root 'static#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
