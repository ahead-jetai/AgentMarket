Rails.application.routes.draw do
  namespace :api do
    post "login", to: "sessions#create"
    delete "logout", to: "sessions#destroy"
    get "me", to: "sessions#show"
    post "purchases", to: "purchases#create"

    namespace :agents do
      scope ":agent_slug" do
        resources :runs, only: [:create, :index]
      end
    end

    get "home", to: "home#index"
    get "categories/:slug", to: "categories#show"
    get "agents/:id", to: "agents#show"

    resources :cart_items, only: %i[create update destroy]
    get "cart", to: "cart#show"
    delete "cart", to: "cart#destroy"
  end

  root "home#index"

  # Let React Router handle front-end routes while keeping Rails endpoints
  get "*path", to: "home#index", constraints: ->(req) {
    !req.path.start_with?("/rails") && !req.path.start_with?("/api")
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
