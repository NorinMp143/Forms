import React from "react"
import PropTypes from "prop-types"
class Forms extends React.Component {
  constructor(){
    super();
    this.state = {
      forms: [
        {
          id: 1,
          name: 'Contact'
        },
        {
          id: 2,
          name: 'Feedback'
        }
      ]
    }
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
              <th colSpan="2"></th>
            </tr>
            {
              this.state.forms.map(form=>(
                <tr key={form.id}>
                  <td>{form.name}</td>
                  <td><a className="btn btn-primary" href={`/forms/${form.id}`}>Show</a></td>
                  <td><a className="btn btn-warning" href={`/forms/${form.id}/edit`}>Edit</a></td>
                  <td><a data-confirm="Are you sure?" className="btn btn-danger" rel="nofollow" data-method="delete" href={`/forms/${form.id}`}>Destroy</a></td>
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
