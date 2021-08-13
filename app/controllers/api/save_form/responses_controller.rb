class Api::SaveForm::ResponsesController < ApplicationController

  def index
    begin
      @form = current_user.forms.find(params[:form_id])
      res = []
      @form.responses.each_with_index do |resp, index|
        res.push({ :id=> resp.id, :response_data => resp.response_data})
      end

      render :json => {:res=> res, :fields => @form.fields}
    rescue
      render :json => {:err => true, :msg=> 'not authrized'}
    end
  end

  def show
    begin
      @form = current_user.forms.find(params[:form_id]);
      @response = @form.responses.find(params[:id])
      if(@response)
        render :json => { :fields => @form.fields, :res => @response.response_data }
      else
        render :json => {:err => true, :msg=> 'not authrized'}
      end
    rescue
      render :json => {:err => true, :msg=> 'not authrized'}
    end
  end

  def destroy
    begin
      @form = current_user.forms.find(params[:form_id]);
      @response = @form.responses.find(params[:id])
      if @response.destroy
        render :json => { :statusOk => true, :res => 'Form successfully deleted.' }
      else
        render :json => { :statusOk => false , :res => 'Something Went Wrong!' }
      end
    rescue
      render :json => {:err => true, :msg=> 'not authrized'}
    end
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
        max-width: 320px;
        margin: 0 auto;
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-control {
        width: 100%;
        text-indent: 10px;
        font-size: 14px;
        padding: 5px 0;
        border-radius: 4px;
        border: 1px solid #ccc;
      }
      .btn{
        background: aliceblue;
        padding: .5rem 3rem;
        border-radius: 4px;
        border: 2px solid aquamarine;
        cursor: pointer;
      }
      .btn[data-align="center"]{
        text-align: center;
      }
      .text-center{
        text-align: center;
      }
      .section-header h3 {
        font-size: 50px;
        text-align: center;
        font-weight: 600;
        position: relative;
        padding-bottom: 15px;
        margin: 20px auto 40px;
        font-family: "exo 2";
        color: #220a09;
      }
      .section-header h3::after {
        content: "";
        position: absolute;
        display: block;
        width: 40px;
        height: 3px;
        background: #e71c24;
        bottom: 0;
        left: calc(50% - 20px);
      }
      .section-header h3::before {
        content: "";
        position: absolute;
        display: block;
        width: 120px;
        height: 1px;
        background: #ddd;
        bottom: 1px;
        left: calc(50% - 60px);
      }
    </style>';
    formHtml = '<form onsubmit="sendMail()">';
    formHtml += '<header class="section-header">
      <h3 class="section-title">%{name}</h3>
      </header>' % { name: @form.name }
    fieldsData = []
    @fields.each do |field|
      elementid = "field#{field.id}";
      fieldsData[fieldsData.length] = field.id;
      formHtml += '<div class="form-group">'
      if(field.fieldtype==='input')
        formHtml += '<input id="%{id}" class="form-control" type="%{t}" name="%{id}"' % { id: elementid, n: field.label, t: field.elementtype }
        formHtml += field.elementtype==='number'?' oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="10" ': ''
        formHtml += ' placeholder="Enter %{p}"/>' % {p: field.label.upcase_first}
      else(field.fieldtype === 'textarea')
        formHtml += '<textarea id="%{id}" rows="4" class="form-control" type="%{t}" name="%{id}" placeholder="Enter %{p}"></textarea>' % { id: elementid, n: field.label, t: field.elementtype, p: field.label.upcase_first }
      end
      formHtml += '</div>'
      
    end
    formHtml += '<div class="text-center"><button class="btn" type="submit" data-align="center">Submit</button></div></form>';
    
    emailRegEx = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'

    script = "datas = #{data.to_json}
    fields = #{fieldsData}
    emailRegExp = #{emailRegEx}
    function sendMail(){
        event.preventDefault();
        function validateFields(type, value){
          switch(type){
            case 'email':
              var pattern = new RegExp(emailRegExp);

              if (!pattern.test(value)) {
                return {
                  isValid : false,
                  errMsg : 'Please enter valid email address.'
                }
              }
              return {
                isValid : true,
              }
              break;
            default:
              return {
                isValid : true,
              }
              break;
          }
        }
        let isFormValid;
        fields.forEach(field=>{
          datas['field'+field] = $(`#field${field}`).val()
          const type = $(`#field${field}`).attr('type')
          const result = validateFields(type,datas['field'+field])
          if(!result.isValid){
            isFormValid = result;
          }
        })
        if(isFormValid){
          return alert(isFormValid.errMsg)
        }
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
    params.permit(:form_id)
  end

end