class StaticController < ApplicationController
  before_action :set_static, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:home]
  def index
  end
  def home
    if(user_signed_in?)
      @form = Form.where(:user_id=>current_user.id)
    end
  end
  def user_details
    if user_signed_in?
      render json: current_user
    else
      render json: {}, status: 401
    end
  end
end
