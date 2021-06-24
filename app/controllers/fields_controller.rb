class FieldsController < ApplicationController
  def create
    fieldtypes = params[:fieldtypes]
    labels = params[:labels]
    placeholders = params[:placeholders]
    types = params[:types]

    @form = Form.find(params[:form_id])
    types.each_with_index do |type, index|
      @field = @form.fields.create(:order => index, :fieldtype=> fieldtypes[index],:label => labels[index], :elementtype => types[index])
    end
    redirect_to form_path(@form)

  end

  skip_before_action :verify_authenticity_token
  def destroy
    # @form = Form.find(params[:form_id])
    @field = Field.find(params[:id])
    if @field.destroy
      render :json => { :response => 'Successfully Sent.' }
    else
      render :json => { :response => 'Something Went Wrong!' }, :status=> 404
    end
  end

  def testing
  end

end
