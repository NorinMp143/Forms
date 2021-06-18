class FormsController < ApplicationController
  def index
    @forms = Form.all
  end

  def show
    @form = Form.find(params[:id])
  end

  def testing
    @form = Form.find(params[:id])
  end

  def new
    @form = Form.new
  end

  def edit
    @form = Form.find(params[:id])
  end

  def create
    # render plain: params[:article].inspect
    @form = Form.new(form_params)
    if @form.save
      redirect_to @form
    else
      render 'new'
    end
  end

  def update
    @form = Form.find(params[:id])
   
    if @form.update(form_params)
      redirect_to @form
    else
      render 'edit'
    end
  end

  def destroy
    @form = Form.find(params[:id])
    @form.destroy
   
    redirect_to forms_path
  end

  private
  def form_params
    params.require(:form).permit(:name)
  end
  
end
