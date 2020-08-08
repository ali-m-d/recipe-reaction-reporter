Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins "https://6d199b1424e34b75afc7e772f48a1b9c.vfs.cloud9.eu-west-2.amazonaws.com"
        resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
    end
    allow do
        origins "https://6d199b1424e34b75afc7e772f48a1b9c.vfs.cloud9.eu-west-2.amazonaws.com"
        resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
    end
    allow do
        origins "http://localhost:8080"
        resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
    end
end