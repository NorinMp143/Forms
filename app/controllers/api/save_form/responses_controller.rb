class Api::SaveForm::ResponsesController < ApplicationController
  protect_from_forgery with: :null_session
  def create
    render json: { data: params[:name]}
  end
end
