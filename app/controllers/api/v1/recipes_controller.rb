class Api::V1::RecipesController < ApplicationController
  def index
    recipe = Recipe.all.order(created_at: :desc)
    render json: recipe
  end

  def create
    image = Cloudinary::Uploader.upload(params[:image])
    
    recipe = Recipe.create!(name: params[:name], ingredients: [], instruction: params[:instruction], image: image["url"])
    JSON.parse(params[:ingredients]).each do |i|
      recipe.ingredients << i
    end
    recipe.save
    
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def destroy
    recipe&.destroy
    render json: {message: 'Recipe deleted'}
  end
  
  private
  
  def recipe_params
    params.permit(:name, :ingredients, :instruction, :image)
  end
  
  def recipe
    @recipe ||= Recipe.find(params[:id])
  end
end
