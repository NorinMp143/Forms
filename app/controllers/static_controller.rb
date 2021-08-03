class StaticController < ApplicationController
  before_action :authenticate_user!, except: [:home]
  def index
  end
  def home
    @form = Form.all
  end
end
