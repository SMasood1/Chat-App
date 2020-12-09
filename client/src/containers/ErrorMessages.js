import React from 'react';
import ErrorMessage from '../components/UI/ErrorMessage';

const ErrorMessages = (props) => {
  // Key is not unique when und
  const errorMessages = props.errorMessages.map(({ value, param, msg }) => {
    console.log(param);
    return (
      <ErrorMessage
        key={param}
        value={value}
        field={param?.toUpperCase()}
        msg={msg} />
    )
  })
  return (
    <div>
      {errorMessages}
    </div>
  )
}
export default ErrorMessages