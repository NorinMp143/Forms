import React from "react"
import PropTypes from "prop-types"

class ShowForm extends React.Component {
  constructor(){
    super();
    this.state = {
      formDetails : {
        name: 'Random Name'
      },
      fields : [
        {
          id: 1,
          label: 'Name'
        },
        {
          id: 2,
          label: 'Email'
        }
      ]
    }
  }

  handleSubmitForm(e){
    e.preventDefault();
  }

  addField(){
    this.setState({fields: [...this.state.fields, { id: this.state.fields[this.state.fields.length-1].id+1, label: ''}]})
  }

  deleteField(field_id){
    this.setState({fields: this.state.fields.filter(({id})=>id!==field_id)})
  }

  updateFieldValues(field_id, element, value){
    const data = this.state.fields;
    const index = data.findIndex(({id})=>id===field_id);
    data[index][element] = value;
    this.setState({fields: data})
  }

  render () {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <div class="whole-container">
          <div class="header">
            <div class="container">
              <div class="pagetitle">
                <h2>Create Form Fields</h2>
              </div>
            </div>
            <div class="formbed-nav">
              <div class="navleft">
                <div class="form-name">
                  <strong>Form Name: </strong>
                  { this.state.formDetails.name }
                  <a className="btn btn-warning" href={`/forms/${id}/edit`}>Edit</a>
                  <a className='btn btn-info' href={`/forms`}>Back</a>
                </div>
              </div>
              <div class="navright">
                <div class="pageaction">
                  <button class="formbed-btn" onClick={()=>this.addField()}>Add New Element</button>
                </div>
              </div>
            </div>
          </div>

          <div class="main-container">
            <section id="form-builder">
              <div class="container">
                <form onSubmit={this.handleSubmitForm}>
                  <div id="form-field-panel">
                  { this.state.fields.map((field, index)=>(
                    <div className="form-field" data-index={`${field.id}`} id={`form-field${index}`}>
                      <div className="form-actions">
                        <div class="left form-options main"></div>
                        <div class="right form-options danger">
                          <div>
                            <button type="button" onClick={()=>this.deleteField(field.id)} data-remote="true" class="action-btn">x</button>
                          </div>
                        </div>
                      </div>
                      <div class="form-field-details">
                        <div class="field-wrapper">
                          {/* <input type="hidden" value={`${field.id}`} /> */}
                          <div class="field-group">
                            {/* add selected field */}
                            <select>
                              <option value='-1'>Select Field Type</option>
                              <option value='input'>Input</option>
                              <option value='textarea'>Textarea</option>
                            </select>
                          </div>
                          <div class="field-group">
                            <input value={field.label} placeholder="Enter Label" onChange={(e)=>this.updateFieldValues(field.id, 'label', e.target.value)} />
                          </div>
                          <div class="field-group">
                            <input placeholder="Enter Placeholder" />
                          </div>
                          <div class="field-group">
                            <select>
                              <option value='-1'>Select Type</option>
                              <option value='text'>Text</option>
                              <option value='email'>Email</option>
                              <option value='number'>Number</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                   {/* here our form fields */}
                  </div>
                  <div id="form-field-action">
                    {
                      this.state.fields.length > 0?
                      <button type="submit" className="formbed-btn">Submit</button>
                      :null
                    }
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShowForm
