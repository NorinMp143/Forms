class Api::SaveForm::ResponsesController < ApplicationController

  def index
    @form = Form.find(params[:form_id])
    @responses = @form.responses
  end

  def show
    @response = Response.find(params[:id])
  end

  def destroy
    @response = Response.find(params[:id])
    form_id = @response.form_id
    @response.destroy
   
    redirect_to form_responses_path(form_id)
  end

  protect_from_forgery with: :null_session
  def create
    @form = Form.find(params[:form_id]);
    newData = { :name => params[:name], :mobile => params[:mobile], :form_id => params[:form_id] }
    if @form.responses.create(newData)
      render :json => { :response => 'Successfully Sent.' }
    else
      render :json => { :response => 'Something Went Wrong!' }, :status=> 404
    end
  end

end
