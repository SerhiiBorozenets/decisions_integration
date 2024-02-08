Rails.application.routes.draw do
  post '/create_decision', to: 'pages#create_decision'
  get '/parse_decisions_data', to: 'pages#parse_decisions_data'

  root 'pages#home'
end
