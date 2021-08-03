import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Preview() {
  const [formDetails, setformDetails] = useState({})
  const [fields, setFields] = useState([]);

  const { id: form_id } = useParams()

  useEffect(()=>{
    let isRendered = true;
    async function getValue(){
      const response = await fetch(`http://localhost:3000/api/forms/${form_id}`,{
        method: 'get',
      });
      const { form, fields } = await response.json();
      if(isRendered){
        setFields(fields);
        setformDetails(form);
      }
    }
    getValue();
    return ()=> isRendered = false;
  },[])

  return (
    <div class="preview-component">
      <form >
    <header class="section-header">
      <h3 class="section-title">{formDetails.name}</h3>
    </header>
    {fields.map(field=>(
      <div class="form-group">
      {field.fieldtype==='input' && 
        <input id={`field${field.id}`} class="form-control" type={field.elementtype} name={`field${field.id}`} placeholder={`Enter ${field.label}`}/> 
      }
      {field.fieldtype === 'textarea' &&
        <textarea id={`field${field.id}`} rows="4" class="form-control"  type={field.elementtype} name={`field${field.id}`} placeholder={`Enter ${field.label}`}></textarea>
      }
      </div>
      
    ))}
    <div class="text-center"><button class="btn" data-align="center">Submit</button></div></form>
    </div>
  )
}
