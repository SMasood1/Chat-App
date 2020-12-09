const SIGNUP = 'SIGNUP';
const SIGNIN = 'SIGNIN';
const CLEANUP = 'CLEANUP';

const authInitialState = {
  token: '',
  errorMessages: []
}

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGNUP:
      if (action.payload.errorType === 'INPUT_ERROR') {
        return {
          ...state,
          errorMessages: action.payload.validationError
        }
      } else {
        return {
          ...state,
          errorMessages: [{ param: action.payload.errorType, msg: action.payload.message }]
        }
      }
    case SIGNIN:
      break;
    case CLEANUP:
      break;

    default:


  }
}

export { authInitialState, authReducer, SIGNIN, SIGNUP };