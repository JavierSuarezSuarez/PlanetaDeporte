class UsersController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users ; /users.json
  def index
    @users = User.all
    json_response(@users)
  end


  # GET /users/new
  def new
    @user = User.new
  end

  # POST /users ; /users.json
  def create
    @user = User.new(user_params)
    @user.id = User.maximum("id")+1
    if @user.save
      session[:user_id] = @user.id
      #redirect_to user_path(@user)
      redirect_to "/client/profile.html"
    else
      render :new
    end
  end



  # GET /users/id ; /users/id.json
  def show
  end

  # GET /users/id/edit
  def edit
    if !logged_in? || !@user
      redirect_to root_path
    end
  end

  # PATCH/PUT /users/id ; /users/id.json
  def update
    if @user
      @user.update(user_params)

      if @user.errors.any?
        render "edit"
      else
        redirect_to "/client/profile.html"
      end
    else
      render "edit"
    end
  end

  # DELETE /users/id ; /users/id.json
  def destroy
    if current_user.id != @user.id
      @user.destroy
    end
  end

  # GET /sendToken
  def sendToken
    @user = current_user
    json_response(@user)
  end

  private

  def user_params

    params.require(:user).permit(:foto, :nombre, :apellidos, :email, :password, :tipo)
  end

  def set_user
    @user = User.find_by_id(params[:id])
  end
end
