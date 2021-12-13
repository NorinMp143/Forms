export function minMaxLength(text, minLength, maxLength) {
  let result = !text || text.length < minLength;
  if(maxLength)
      result = result || text.length < minLength;
  return result;
}

export function validateAlphabet(value){
  return new RegExp(/^[A-Za-z]+$/).test(value)
}

export function numberWithAlphabet(value){
  return new RegExp("^[a-zA-Z0-9]+$").test(value)
}

export function cssWidthProperty(value){
  return new RegExp("^[0-9]+(\px|\em|rem|\%)$").test(value)
}