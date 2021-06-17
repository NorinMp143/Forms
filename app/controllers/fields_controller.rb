class FieldsController < ApplicationController
  def create
    @tags = params[:tags]
    @weights = params[:weights]
    render 'testing'
    # tags.each_with_index do |tag, index|
      # tag = Tag.create :name => tag
      # Skill.create :tag_id => tag.id, :weight => weights[index]
    # end
    # @form = Form.find(params[:form_id])
    # @form = @form.fields.create(field_params)
    # redirect_to form_path(@form)
  end

  def testing
  end
 
  private
    def field_params
      params.require(:field).permit(:order,:fieldtype,:label,:elementtype)
    end

end
