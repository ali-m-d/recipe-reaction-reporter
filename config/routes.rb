Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/search', to: 'recipes#search'
      post 'recipes/create', to: 'recipes#create'
      post 'recipes/:id/comments', to: 'comments#create'
      get 'recipes/:id', to: 'recipes#show'
      get 'recipes/:id/comments', to: 'comments#index'
      delete '/destroy/:id', to: 'recipes#destroy'
      resources :sessions, only: [:create]
      resources :registrations, only: [:create]
      delete :logout, to: 'sessions#logged_out'
      get :logged_in, to: 'sessions#logged_in'
    end
  end
  
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
