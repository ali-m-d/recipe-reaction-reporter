Cloudinary.config do |config|
   config.cloud_name = "dbhgzt56w"
   config.api_key = ENV['cloudinary_api_key']
   config.api_secret = ENV['cloudinary_api_secret']
   config.secure = true
   config.cdn_subdomain = true
end