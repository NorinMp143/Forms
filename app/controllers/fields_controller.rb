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

  def testing
  end

end
