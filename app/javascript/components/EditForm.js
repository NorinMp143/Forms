import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {minMaxLength, validateAlphabet, cssWidthProperty} from './helpers/validations'
import {FormErrors} from './FormErrors'

export default function EditForm() {
  const { id: form_id } = useParams()
  const history = useHistory();
  const user_id = localStorage.getItem('user_id');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    namecolor: '',
    descolor: '',
    titleunderlinecolor: '',
    maxwidth: '',
    borderradius: '',
    boxshadow: '',
    bgcolor: '',
    fieldcolor: '',
    fieldbrcolor: '',
    btncolor: '',
    btnbgcolor:'',
    user_id: user_id
  })
  const [state, setState] = useState({
    formErrors : {
      name: '',
      description: '',
      namecolor: '',
      descolor: '',
      titleunderlinecolor: '',
      maxwidth: '',
      borderradius: '',
      boxshadow: '',
      bgcolor: '',
      fieldcolor: '',
      fieldbrcolor: '',
      btncolor: '',
      btnbgcolor:''
    },
    fieldValids : {
      name: false,
      description: false,
      namecolor: false,
      descolor: false,
      titleunderlinecolor: false,
      maxwidth: false,
      borderradius: false,
      boxshadow: false,
      bgcolor: false,
      fieldcolor: false,
      fieldbrcolor: false,
      btncolor: false,
      btnbgcolor: false
    },
    formValid: false
  })

  function validateField(fieldName, value) {
    let fieldValidationErrors = state.formErrors;
    let fieldValidValues = state.fieldValids;
    let msg = '';
    let result;
    switch(fieldName) {
      case 'name':
        result = validateAlphabet(value);
        if(!result){
          fieldValidValues[fieldName] = result;
          msg = 'please write a-z letter only.'
        }else{
          fieldValidValues[fieldName] = !minMaxLength(value, 3);
          msg = 'please type atleast 3 character.';
        }
        break;
      case 'description':
        result = validateAlphabet(value);
        if(!result){
          fieldValidValues[fieldName] = result;
          msg = 'please write a-z letter only.'
        }
        break;
      case 'maxwidth':
        result = cssWidthProperty(value)
        if(!result){
          fieldValidValues[fieldName] = result;
          msg = 'please write one of format 23px, 100%, 4rem, 6em.'
        }
        break;
      case 'borderradius':
        result = cssWidthProperty(value)
        if(!result){
          fieldValidValues[fieldName] = result;
          msg = 'please write one of format 23px, 100%, 4rem, 6em.'
        }
        break;
      default:
        break;
    }
    fieldValidationErrors[fieldName] = fieldValidValues[fieldName] ? '' : msg;
    setState({formErrors: fieldValidationErrors, fieldValids: fieldValidValues});
    validateForm();
  }

  function validateForm() {
    function getFormValid(){
      const keys = Object.keys(state.fieldValids);
      for(let i=0;i<keys.length;i++){
        if(state.fieldValids[keys[i]]===false){
          return false
        }
      }
      return true;
    }
    const isFormValid = getFormValid()
    setState({...state,formValid: isFormValid});
  }

  const updateFormValues = (value, name) => {
    setFormData({...formData,[name]:value})
    validateField(name, value)
  }

  useEffect(() => {
    var isRendered = true;
    async function getValue(){
      const response = await fetch(`http://localhost:3000/api/forms/${form_id}/edit`);
      const res = await response.json();
      if(isRendered){
        if(res.err){
          history.push('/forms')
        }
        else{
          setFormData(res)
        }
      }
    }
    getValue();
    return () => isRendered = false
  }, [])

  /**
   * 
   * checking that is any field which is empty, if it is then it return truw so we don't make call to
   * our api
   * @param no params
   * @returns true | false, boolean
   * 
   */
  
  function isAnyFieldEmpty(){
    const fields = Object.keys(formData).filter(key=>formData[key]===null)
    if(fields.length){
      return true
    }else{
      return false
    }
  }


  const handleSubmit = (e)=>{
    e.preventDefault();
    if(isAnyFieldEmpty()){
      return alert('Please fill the details.')
    }
    if(!state.formValid){
      return alert('Please check our form.')
    }
    (async()=>{ 
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      const response = await fetch(`http://localhost:3000/api/forms/${form_id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf
        },
        body: JSON.stringify({
          form: formData
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
    <div className="container" id="editform">
      <div className="form">
      <h1>Edit Form</h1>
      <div className="panel panel-default">
        <FormErrors formErrors={state.formErrors} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="#name">Name</label><br/>
          <input id="name" name="name" value={formData.name} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#description">Description</label><br/>
          <textarea id="description" name="description" value={formData.description} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="#namecolor">Name Color</label><br/>
          <input id="namecolor" name="namecolor" value={formData.namecolor} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#descolor">Description Color</label><br/>
          <input id="descolor" name="descolor" value={formData.descolor} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#titleunderlinecolor">Title Underline Color</label><br/>
          <input id="titleunderlinecolor" name="titleunderlinecolor" value={formData.titleunderlinecolor} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#maxwidth">Max Width</label><br/>
          <input id="maxwidth" name="maxwidth" value={formData.maxwidth} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#borderradius">Border Radius</label><br/>
          <input id="borderradius" name="borderradius" value={formData.borderradius} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#boxshadow">Box Shadow</label><br/>
          <input id="boxshadow" name="boxshadow" value={formData.boxshadow} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#bgcolor">Background Color</label><br/>
          <input id="bgcolor" name="bgcolor" value={formData.bgcolor} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#fieldcolor">Field Color</label><br/>
          <input id="fieldcolor" name="fieldcolor" value={formData.fieldcolor} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#fieldbrcolor">Field Border Color</label><br/>
          <input id="fieldbrcolor" name="fieldbrcolor" value={formData.fieldbrcolor} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#btncolor">Button Color</label><br/>
          <input id="btncolor" name="btncolor" value={formData.btncolor} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="#btnbgcolor">Button Background Color</label><br/>
          <input id="btnbgcolor" name="btnbgcolor" value={formData.btnbgcolor} onChange={(e)=>updateFormValues(e.target.value,e.target.id)} className="form-control" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
      <a href="/forms" className="btn btn-info">Back</a>
      </div>
    </div>
  )
}
