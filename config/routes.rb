Rails.application.routes.draw do
  post '/create_decision', to: 'pages#create_decision'
  get '/init_data', to: 'pages#init_data'

  root 'pages#home'
end
