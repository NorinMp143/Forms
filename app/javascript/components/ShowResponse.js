import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function ShowResponse() {
  const [response, setResponses] = useState({})
  const [fields, setFields] = useState([])

  const { id , res_id } = useParams()

  useEffect(() => {
    async function getValue(){
      let isRendered = true
      const response = await fetch(`http://localhost:3000/api/forms/${id}/responses/${res_id}`);
      const {res, fields} = await response.json()
      if(isRendered){
        setResponses({response_data: res});
        setFields(fields);
      }
      return () => isRendered = false
    }
    getValue();
  }, [])
  
  return (
    <div className="container">
      <h1>Listing Responses</h1>
      <a href="/forms" className='btn btn-info'>Back</a>
      <div className="table-responsive">
        <table className="table">
          <tr>
            { fields.map(field=>(
              <th key={field.label}>{ field.label }</th>
            ))}
          </tr>
          <tr>
            { response?.response_data && response.response_data.map((field,i)=>(
              <td key={field.value+i}>{ field.value }</td>
            ))}
          </tr>
      </table>
      </div>
    </div>
  )
}
