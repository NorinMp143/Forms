class Api::SaveForm::ResponsesController < ApplicationController

  def index
    @form = Form.find(params[:form_id])
  end

  def show
    @form = Form.find(params[:form_id]);
    @response = @form.responses.find(params[:id])
  end

  def destroy
    @form = Form.find(params[:form_id]);
    @response = @form.responses.find(params[:id])
    @response.destroy
    redirect_to form_responses_path(@form)
  end

  protect_from_forgery with: :null_session
  def create
    @response = Response.new(res_params)
    if @response.save
      newDatas = []
      @response.form.fields.each do |field|
        newDatas[newDatas.length] = { 
          :field_id => field.id,
          :value => params['field'+field.id.to_s],
          :form_id => params[:form_id]
        }
      end
      success = false;
      newDatas.each do |newData|
        if @response.response_data.create(newData)
          success = true
        else
          success = false
          break
        end
      end
      if success
        render :json => { :response => 'Successfully Sent.' }
      else
        render :json => { :response => 'Something Went Wrong!' }, :status=> 404
      end
    else
      render :json => { :response => 'Something Went Wrong!' }, :status=> 404
    end
    
  end

  protect_from_forgery with: :null_session
  def display
    @form = Form.find(params[:id])
    @fields = @form.fields

    data = { form_id: params[:id] };
    style = '<style>
      .container{
        width: 100%;
        max-width: 90%;
        margin: 0 auto;
      }
      form {
        padding: 3rem 2rem;
        box-shadow: 0 0 50px 0 aliceblue;
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-control {
        width: 100%;
      }
      .btn{
        background: aliceblue;
        padding: .5rem 3rem;
        border-radius: 4px;
        border: 2px solid aquamarine;
        cursor: pointer;
      }
    </style>';
    formHtml = '<form onsubmit="sendMail()">';
    fieldsData = []
    @fields.each do |field|
      elementid = "field#{field.id}";
      fieldsData[fieldsData.length] = field.id;
      formHtml += '<div class="form-group"><input id="%{id}" class="form-control" type="%{t}" name="%{id}" placeholder="Enter %{p}"/></div>' % { id: elementid, n: field.label, t: field.elementtype, p: field.label.upcase_first }
    end
    formHtml += '<button class="btn" type="submit">Submit</button></form>';
    script = "datas = #{data.to_json}
    fields = #{fieldsData}
    function sendMail(){
        event.preventDefault();
        fields.forEach(field=>{
          datas['field'+field] = $(`#field${field}`).val()
        })
        $.ajax({
          url: 'http://localhost:3000/api/save_form/responses',
          method: 'post',
          data: datas,
          complete: function(data){
            console.log(data);
            alert(data.responseJSON.response);
          }
        });
      }"
    fullHtmlCode = style + formHtml;
    render :json => { :response => fullHtmlCode, :script => script }
  end

  private
  def res_params
    params.require(:response).permit(:form_id)
  end

end