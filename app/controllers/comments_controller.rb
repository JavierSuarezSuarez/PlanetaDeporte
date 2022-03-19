class CommentsController < ApplicationController

  skip_before_action :verify_authenticity_token

  # GET /comments ; /comments.json
  def index
    @comments = Comment.all
    json_response(@comments)
  end

  # POST /articles/id/comments
  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)
    redirect_to article_path(@article)
  end

  # GET /articles/id/comments/id/edit
  def edit
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
  end


  def update
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    if @comment.update(comment_params)
        redirect_to '/client/admin_comments_panel.html'
    else
      render 'edit'
    end
  end

  #DELETE /articles/id/comments/id ; /articles/id/comments/id.json
  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    @comment.destroy
    redirect_to article_path(@article)
  end

  private

  def comment_params
    params.require(:comment).permit( :user_id, :article_id, :texto)
  end

end
