class ArticlesController < ApplicationController

  skip_before_action :verify_authenticity_token
  #Find the article for show, edit, update and destroy actions (%i means array with withespaces)
  before_action :set_article, only: %i[ show edit update destroy]

  # GET /articles ; /articles.json
  def index
    @articles = Article.all
    json_response(@articles)
  end

  # GET /articles/id ; /articles/id.json
  def show
  end

  # GET /articles/new
  def new
    @article = Article.new

  end

  # POST /articles ; /articles.json
  def create
    @article = Article.new(article_params)
    @article.id = Article.maximum("id")+1

    if @article.save
      if current_user.tipo == "1"
        redirect_to '/client/admin_content_panel.html'
      else
        redirect_to '/client/writer_content_panel.html'
      end
    else
      render 'new'
    end
  end

  # GET /articles/id/edit
  def edit
  end

  # PATCH/PUT /articles/id ; /articles/id.json
  def update
    if @article.update(article_params)
      if current_user.tipo == "1"
        redirect_to '/client/admin_content_panel.html'
      else
        redirect_to '/client/writer_content_panel.html'
      end
    else
      render 'edit'
    end
  end

  # DELETE /articles/id ; /articles/id.json
  def destroy
    @article.destroy
    redirect_to articles_path
  end


  #Aux Methods
  private

  #Sets an article for show, edit, update and destroy actions
  def set_article
    @article = Article.find(params[:id])
  end

  #Sets the allowed article parameters
  def article_params
    params.require(:article).permit(:user_id, :foto, :fecha, :titulo, :subtitulo, :seccion, :cuerpo, :imagen)
  end
end
