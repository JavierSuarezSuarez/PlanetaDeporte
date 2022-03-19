Rails.application.routes.draw do
  #----------------------------------Home & General Routes --------------------------------------------#
  root to: 'home#index'
  get 'home/index'

  resources :articles do
    resources :comments
  end

  resources :users
  #----------------------------------Article Routes -----------------------------------------#
  get 'articles', to: 'articles#index'
  get 'articles/new', to: 'articles#new'
  get 'articles/:id', to: 'articles#show'
  get 'articles/:id/edit', to: 'articles#edit'
  post 'articles', to: 'articles#create'
  delete 'articles/:id', to: 'articles#destroy'

  #----------------------------------Comment Routes -----------------------------------------#
  get 'comments', to: 'comments#index'
  get 'comments/new', to: 'articles#new'
  post '/articles/:id/comments', to: 'comments#create'
  delete '/articles/:id/comments/:id', to: 'comments#destroy'

  #----------------------------------User Routes -----------------------------------------#

  get 'users', to: 'users#index'
  get 'sendToken', to: 'users#sendToken'
  delete 'users/:id', to: 'users#destroy'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'


end
