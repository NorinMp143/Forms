import React from "react"
import PropTypes from "prop-types"
class Forms extends React.Component {
  constructor(){
    super();
    this.state = {
      forms: []
    }
  }

  componentDidMount(){
    (async () => { 
      const response = await fetch('http://localhost:3000/api/forms',{
        method: 'get',
      });
      const res = await response.json();
      this.setState({forms: res})
    })()
  }

  handleClick(form_id){
    (async () => { 
      const response = await fetch(`http://localhost:3000/api/forms/${form_id}`,{
        method: 'delete'
      });
      const { statusOk, res} = await response.json();
      if(statusOk){
        this.setState({forms: this.state.forms.filter(f=>f.id!==form_id)})
      }
      alert(res);
    })()
  }

  render () {
    return (
      <React.Fragment>
        <div className="container">
          <h1>Listing Forms</h1>
          <a className="btn btn-primary" href="/forms/new">New Form</a>

          <div className="table-responsive">
          <table className="table">
            <tbody>
            <tr>
              <th>Name</th>
              <th colSpan="5"></th>
            </tr>
            {
              this.state.forms.map(form=>(
                <tr key={form.id}>
                  <td>{form.name}</td>
                  <td><a className="btn btn-primary" href={`/forms/${form.id}`}>Show</a></td>
                  <td><a className="btn btn-primary" href={`/forms/${form.id}/preview`}>Preview</a></td>
                  <td><a className="btn btn-warning" href={`/forms/${form.id}/edit`}>Edit</a></td>
                  <td><button className="btn btn-danger" onClick={()=>this.handleClick(form.id)} >Destroy</button></td>
                  <td><a className="btn btn-info" href={`/forms/${form.id}/responses`}>All Responses</a></td>
                </tr>
              ))
            }
              
          </tbody></table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Forms
