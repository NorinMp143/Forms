export function minMaxLength(text, minLength, maxLength) {
  let result = !text || text.length < minLength;
  if(maxLength)
      result = result || text.length < minLength;
  return result;
}