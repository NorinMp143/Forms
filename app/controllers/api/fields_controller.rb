class Api::FieldsController < ApplicationController
  def create
    # get fields data from request
    fields = params[:fields]
    # getting form instance
    @form = Form.find(params[:form_id])
    
    fields.each_with_index do |field, index|
      # if new field, then create field else update field
      if(field.respond_to?('isNew'))
        @fieldc = @form.fields.create(
          :order => index, 
          :fieldtype=> field.fieldtype,
          :label => field.label, 
          :elementtype => field.elementtype
        )
      else
        @fieldc = @form.fields.where(:id=>field.id).update(
          :order => index, 
          :fieldtype=> field.fieldtype,
          :label => field.label, 
          :elementtype => field.elementtype
        )
      end
    end
    
    render :json => { :res => 'Successfully submited.' }

  end

  # skip_before_action :verify_authenticity_token
  def destroy
    # @form = Form.find(params[:form_id])
    @field = Field.find(params[:id])
    if @field.destroy
      render :json => { :res => 'Successfully Sent.', :statusOk => true }
    else
      render :json => { :res => 'Something Went Wrong!', :statusOk => false }
    end
  end

end
