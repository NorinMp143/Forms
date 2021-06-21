class Api::SaveForm::ResponsesController < ApplicationController
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
