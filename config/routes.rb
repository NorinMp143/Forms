Rails.application.routes.draw do
  
  resources :forms do
    resources :fields
    resources :responses, controller: 'api/save_form/responses'
  end
    
  namespace :api do
    namespace :save_form do
      resources :responses
    end
    post 'embed/forms/:id', controller: 'save_form/responses', action: 'display'
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  # root 'static#index'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
