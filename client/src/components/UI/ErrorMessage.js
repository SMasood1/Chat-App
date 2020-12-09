import React from 'react';

const ErrorMessage = (props) => {
  let errorMessage = '';
  if(props.field && props.msg){
    errorMessage = `${props.field}: ${props.msg}`;
  }
  return (
    <p>
      {errorMessage}
    </p>
  )
}

export default ErrorMessage