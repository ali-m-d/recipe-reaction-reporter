class Api::V1::RegistrationsController < ApplicationController
    def create
        user = User.create(
            username: params["user"]["username"],
            password: params["user"]["password"],
            password_confirmation: params["user"]["password_confirmation"]
        )
        
        if user.save
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
           }
        else
            render json: { status: 500 }
        end
    end 
end