class Api::FormsController < ApplicationController
  def index
    # forms = Form.all
    forms = current_user.forms
    render :json => forms
  end

  def show
    begin
      form = current_user.forms.find(params[:id]) 
      render :json => {:form=> form, :fields=> form.fields }
    rescue
      render :json => {:err => true, :msg=> 'not authrized'}
    end
  end

  def testing
    @form = Form.find(params[:id])
  end

  def new
    @form = Form.new
  end

  def edit
    begin
      form = current_user.forms.find(params[:id])
      render :json => form
    rescue
      render :json => {:err => true, :msg=> 'not authrized'}
    end

  end

  protect_from_forgery with: :null_session
  def create
    # render plain: params[:article].inspect
    @form = Form.new(form_params)
    if @form.save
      render :json => { :statusOk => true, :res => 'Form Successfully Created.' }
    else
      render :json => { :statusOk => false , :res => 'Something Went Wrong!' }
    end
  end

  protect_from_forgery with: :null_session
  def update
    @form = Form.find(params[:id])
   
    if @form.update(form_params)
      render :json => { :statusOk => true, :res => 'Form Successfully Updated.' }
    else
      render :json => { :statusOk => false , :res => 'Something Went Wrong!' }
    end
  end

  def destroy
    begin
      @form = current_user.forms.find(params[:id])
      if @form.destroy
        render :json => { :statusOk => true, :res => 'Form successfully deleted.' }
      else
        render :json => { :statusOk => false , :res => 'Something Went Wrong!' }
      end
    rescue
      render :json => {:err => true, :msg=> 'not authrized'}
    end
  end

  
  private
  def form_params
    params.require(:form).permit(:name, :description, :namecolor, :descolor, :titleunderlinecolor, :maxwidth, :borderradius, :boxshadow, :bgcolor, :fieldcolor, :fieldbrcolor, :btncolor, :btnbgcolor,:user_id)
  end
  
end
