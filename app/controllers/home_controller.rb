class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    if logged_in?
      redirect_to '/client/home_registered.html'
    else
      redirect_to '/client/home.html'
    end

  end
end
