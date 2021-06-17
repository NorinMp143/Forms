Rails.application.routes.draw do
  resources :forms do
    resources :fields
  end
  get 'home/form'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
