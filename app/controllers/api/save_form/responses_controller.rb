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

  def display
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


end
