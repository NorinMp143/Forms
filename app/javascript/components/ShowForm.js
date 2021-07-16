import React from "react"
import PropTypes from "prop-types"

class ShowForm extends React.Component {
  constructor(){
    super();
    this.state = {
      formDetails : {},
      fields : []
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    (async () => { 
      const response = await fetch(`http://localhost:3000/api/forms/${id}`,{
        method: 'get',
      });
      const { form, fields } = await response.json();
      this.setState({formDetails: form, fields: fields })
    })()
  }

  handleSubmitForm = async (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const response = await fetch(`http://localhost:3000/api/forms/${id}/fields`,{
      method: 'post',
      headers:{
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({
        fields: this.state.fields
      })
    });
    const { res } = await response.json();
    alert(res);
  }

  addField(){
    let dataset = this.state.fields[0];
    let fieldKeys = Object.keys(dataset)
    let fieldObj = {}
    fieldKeys.forEach(key=>{
      fieldObj[key] = typeof(dataset[key])==='number'? null : ''
    })
    fieldObj.id = this.state.fields[this.state.fields.length-1].id+1;
    fieldObj.isNew = true
    this.setState({fields: [...this.state.fields, fieldObj ]})
  }

  deleteField(field_id){
    const index = this.state.fields.findIndex(({id})=>id===field_id)
    if(this.state.fields[index]?.isNew){
      this.setState({fields: this.state.fields.filter(({id})=>id!==field_id)})
    }else{
      const { id } = this.props.match.params;
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      (async () => { 
        const response = await fetch(`http://localhost:3000/api/forms/${id}/fields/${field_id}`,{
          method: 'delete',
          headers:{
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf
          },
        });
        const { statusOk, res} = await response.json();
        if(statusOk){
          this.setState({fields: this.state.fields.filter(({id})=>id!==field_id)})
        }
        alert(res);
      })()
    }
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
        <div className="whole-container">
          <div className="header">
            <div className="container">
              <div className="pagetitle">
                <h2>Create Form Fields</h2>
              </div>
            </div>
            <div className="formbed-nav">
              <div className="navleft">
                <div className="form-name">
                  <strong>Form Name: </strong>
                  { this.state.formDetails.name }
                  <a className="btn btn-warning" href={`/forms/${id}/edit`}>Edit</a>
                  <a className='btn btn-info' href={`/forms`}>Back</a>
                </div>
              </div>
              <div className="navright">
                <div className="pageaction">
                  <button className="formbed-btn" onClick={()=>this.addField()}>Add New Element</button>
                </div>
              </div>
            </div>
          </div>

          <div className="main-container">
            <section id="form-builder">
              <div className="container">
                <form onSubmit={this.handleSubmitForm}>
                  <div id="form-field-panel">
                  { this.state.fields.map((field, index)=>(
                    <div key={field.id} className="form-field">
                      <div className="form-actions">
                        <div className="left form-options main"></div>
                        <div className="right form-options danger">
                          <div>
                            <button type="button" onClick={()=>this.deleteField(field.id)} data-remote="true" className="action-btn">x</button>
                          </div>
                        </div>
                      </div>
                      <div className="form-field-details">
                        <div className="field-wrapper">
                          {/* <input type="hidden" value={`${field.id}`} /> */}
                          <div className="field-group">
                            {/* add selected field */}
                            <select value={field.fieldtype}
                              onChange={(e)=>this.updateFieldValues(field.id, 'fieldtype', e.target.value)}
                            >
                              <option value='-1'>Select Field Type</option>
                              <option value='input'>Input</option>
                              <option value='textarea'>Textarea</option>
                            </select>
                          </div>
                          <div className="field-group">
                            <input value={field.label} placeholder="Enter Label" onChange={(e)=>this.updateFieldValues(field.id, 'label', e.target.value)} />
                          </div>
                          <div className="field-group">
                            <input placeholder="Enter Placeholder" />
                          </div>
                          <div className="field-group">
                            <select value={field.elementtype}
                              onChange={(e)=>this.updateFieldValues(field.id, 'elementtype', e.target.value)}
                            >
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
