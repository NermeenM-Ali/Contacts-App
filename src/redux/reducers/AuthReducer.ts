import * as types from '../Type';
import moment from 'moment';

const initialState = {
  userInfo: null,
  isLoginLoading: false,
  isVerificationModalVisible: false,
  CodeNum1: null,
  CodeNum2: null,
  CodeNum3: null,
  CodeNum4: null,
  CodeNum5: null,
  CodeNum6: null,
  isNumberVerified: false,
  confirmCodeResult: null,
  isConfirmCodeLoading: false,
  formikSetStatus: null,
  formikResetForm: null,
  isResendButtonExist: false,
  eventDate: moment.duration().add({minutes: 3, seconds: 0}),
  mins: 0,
  secs: 0,
  phoneNumber: '',
};

const AuthReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.SAVE_USER_INFORMATION:
      return {...state, userInfo: action.payload};
    case types.LOGOUT_USER:
      return {...state, userInfo: null};
    case types.IS_RESEND_BUTTON_EXIST:
      return {...state, isResendButtonExist: action.payload};
    case types.RESET_TIMER:
      return {
        ...state,
        eventDate: moment.duration().add({minutes: 3, seconds: 0}),
        mins: 0,
        secs: 0,
      };
    case types.CHANGE_AUTH_PROPS:
      return {...state, [action.prop]: action.value};
    default:
      return state;
  }
};

export default AuthReducer;
