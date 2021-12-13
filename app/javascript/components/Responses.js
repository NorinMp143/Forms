import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

export default function Responses() {
  const [responses, setResponses] = useState([])
  const [fields, setFields] = useState([])

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    var isRendered = true;
    async function getValue(){
      const response = await fetch(`http://localhost:3000/api/forms/${id}/responses`);
      const resp = await response.json();
      if(isRendered){
        if(resp.err){
          history.push('/forms')
        }
        else{
          const {res, fields} = resp;
          setFields(fields);
          setResponses(res);
        }
      }
    }
    getValue();
    return () => isRendered = false
  }, [])

  function handleClick(resp_id){
    (async () => { 
      const response = await fetch(`http://localhost:3000/api/forms/${id}/responses/${resp_id}`,{
        method: 'delete'
      });
      const { statusOk, res} = await response.json();
      if(statusOk){
        setResponses(responses.filter(f=>f.id!==resp_id))
      }
      alert(res);
    })()
  }

  return (
    <div className="container">
      <h1>Listing Responses</h1>
      <a href="/forms" className='btn btn-info'>Back</a>
      { responses.length > 0 ?
      <div className="table-responsive">
        <table className="table">
          <tbody> 
          <tr>
            { fields.map(field=>(
              <th key={field.label}>{ field.label }</th>
            ))}
          </tr>
          { responses.map(response=>(
            <tr key={response.id}>
              { response.response_data.map((field,i)=>(
                <td key={i}>{ field.value }</td>
              ))}
              <td><a href={`/forms/${id}/responses/${response.id}`} className='btn btn-primary'>Show</a></td>
        <td><button className="btn btn-danger" onClick={()=>handleClick(response.id)} >Destroy</button></td>
            </tr>
          ))}
          </tbody>
      </table>
      </div>
      :
      <>
        No Responses Found
      </>
      }
    </div>
  )
}
