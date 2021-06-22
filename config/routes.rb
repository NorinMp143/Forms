Rails.application.routes.draw do
  
  resources :forms do
    resources :fields
    resources :responses, controller: 'api/save_form/responses'
  end
  namespace :api do
    namespace :save_form do
      resources :responses
    end
    get 'embed/forms/:id', controller: '/forms', action: 'embed'
  end

  get 'home/form'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
