import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function NewForm() {
  const history = useHistory();

  const [name, setName] = useState('')

  const updateFormValues = (value) => {
    setName(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  (async()=>{
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const response = await fetch('http://localhost:3000/api/forms',{
      method: 'post',
      headers:{
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({
        form: { name: name }
      })
    });
    const { statusOk, res} = await response.json();
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
          <label for="#name">Name</label><br/>
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
