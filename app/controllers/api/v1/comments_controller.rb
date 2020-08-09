class Api::V1::CommentsController < ApplicationController
  before_action :set_recipe 
  
  def index
    comments = @recipe.comments.all.order(created_at: :desc)
    render json: comments
  end
  
  def create
      
    comment = @recipe.comments.create!(comment_params)
      
    if comment.save
        render json: comment
    else
        render json: comment.errors
    end
  end
  
  private 
  
  def comment_params
    params.require(:comment).permit(:content, :user_id, :recipe_id)
  end
  
  def set_recipe
    @recipe ||= Recipe.find(params[:id])
  end
   
end