Rails.application.routes.draw do
  resources :forms do
    resources :fields
  end
  namespace :api do
    namespace :save_form do
      resources :responses
    end
  end

  get 'home/form'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
