import React, { useReducer, useEffect } from 'react';
// import styled from 'styled-components';

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
}

const Input = props => {
  const { onInputChange, id, label, minLength, initialValue, errorText, ...inputAtt } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: '',
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    let isValid = true;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid, })
  }
  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  }
  return (
    <div>
      <label>{label}</label>
      <input
        {...inputAtt}
        value={inputState.value} 
        onBlur={lostFocusHandler}
        onChange={(e) => textChangeHandler(e.target.value)}

        />
    </div>
  )
}

export default Input;