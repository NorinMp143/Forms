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

  def embed
    @form = Form.find(params[:id])
    @fields = @form.fields

    data = { form_id: params[:id] };

    formHtml = '<form onsubmit="sendMail()">';
    
    @fields.each do |field|
      data[field.label] = `$('##{field.label}').val()`
      formHtml += '<input id="%{n}" type="%{t}" name="%{n}" placeholder="Enter %{p}"/>' % { n: field.label, t: field.elementtype, p: field.label.upcase_first }
    end
    formHtml += '<button type="submit">Submit</button></form>';
    formHtml += "<script>function sendMail(){
      event.preventDefault();
      $.ajax({
        url: 'http://localhost:3000/api/save_form/responses',
        method: 'post',
        data: #{data.to_json},
        complete: function(data){
          console.log(data);
        }
      })
    }</script>"
    render :json => { :response => formHtml }
  end

  private
  def form_params
    params.require(:form).permit(:name)
  end
  
end
