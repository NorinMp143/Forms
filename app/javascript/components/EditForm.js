import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

export default function EditForm() {
  const { id: form_id } = useParams()
  const history = useHistory();

  const [name, setName] = useState('')

  const updateFormValues = (value) => {
    setName(value)
  }

  useEffect(() => {
    var isRendered = true;
    async function getValue(){
      const response = await fetch(`http://localhost:3000/api/forms/${id}/responses`);
      const {res, fields} = await response.json();
      if(isRendered){
        setFields(fields);
        setResponses(res);
      }
    }
    getValue();
    return () => isRendered = false
  }, [])

  const handleSubmit = (e)=>{
    e.preventDefault();
    (async()=>{ 
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      const response = await fetch(`http://localhost:3000/api/forms/${form_id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf
        },
        body: JSON.stringify({
          form: { name: name }
        })
      });
      const { statusOk, res } = await response.json();
      if(statusOk){
        return history.push('/forms')
      }else{
        return history.push('/forms/new')
      }
      alert(res);
    })()
  }
  return (
    <div className="container">
      <h1>New Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="#name">Name</label><br/>
          <input id="name" name="name" value={name} onChange={(e)=>updateFormValues(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
      <a href="/forms" className="btn btn-info">Back</a>
    </div>
  )
}
