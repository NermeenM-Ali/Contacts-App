import {RNToasty} from 'react-native-toasty';
import auth from '@react-native-firebase/auth';
import * as types from '../Type';

export const handleUserRegisteration = (
  email: string,
  password: string,
  navigation: any,
) => {
  return (dispatch: any, getState: any) => {
    let {formikSetStatus, formikResetForm} = getState().AuthReducer;
    dispatch(changeAuthProps('isLoginLoading', true));
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data: any) => {
        RNToasty.Success({title: 'Account Created Successfully'});
        navigation.replace('TabScreen');
        dispatch({
          type: types.SAVE_USER_INFORMATION,
          payload: data.user,
        });
        formikResetForm({});
        formikSetStatus({success: true});
      })
      .catch((error: any) => {
        if (error.code === 'auth/email-already-in-use') {
          dispatch(loginUser(email, password, navigation));
        } else if (error.code === 'auth/invalid-email') {
          RNToasty.Error({title: 'That email address is invalid!'});
        } else {
          RNToasty.Error({title: error.message});
        }
      })
      .finally(() => dispatch(changeAuthProps('isLoginLoading', false)));
  };
};

const loginUser = (email: string, password: string, navigation: any) => {
  return (dispatch: any, getState: any) => {
    let {formikSetStatus, formikResetForm} = getState().AuthReducer;
    dispatch(changeAuthProps('isLoginLoading', true));
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((data: any) => {
        RNToasty.Success({title: 'Login Successfully'});
        navigation.replace('TabScreen');
        dispatch({
          type: types.SAVE_USER_INFORMATION,
          payload: data.user,
        });
        formikResetForm({});
        formikSetStatus({success: true});
      })
      .catch((error: any) => {
        RNToasty.Error({title: error.message});
      })
      .finally(() => dispatch(changeAuthProps('isLoginLoading', false)));
  };
};

export const LogOutUser = (navigation: any) => {
  return (dispatch: any) => {
    auth()
      .signOut()
      .then(() => {
        dispatch({type: types.LOGOUT_USER});
        navigation.replace('LoginScreen');
      });
  };
};

export const changeAuthProps = (prop: any, value: any) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: types.CHANGE_AUTH_PROPS,
      prop,
      value,
    });
  };
};

let timerInterval: any;
export const StartTimer = () => {
  return (dispatch: any, getState: any) => {
    timerInterval = setInterval(() => {
      let {eventDate} = getState().AuthReducer;
      if (eventDate <= 0) {
        clearInterval(timerInterval);
        dispatch({type: types.IS_RESEND_BUTTON_EXIST, payload: true});
      } else {
        dispatch({type: types.IS_RESEND_BUTTON_EXIST, payload: false});
        eventDate = eventDate.subtract(1, 's');
        const mins = eventDate.minutes();
        const secs = eventDate.seconds();
        dispatch(changeAuthProps('mins', mins));
        dispatch(changeAuthProps('secs', secs));
        dispatch(changeAuthProps('eventDate', eventDate));
      }
    }, 1000);
  };
};

export const RestTimer = () => {
  return (dispatch: any) => {
    dispatch({type: types.IS_RESEND_BUTTON_EXIST, payload: false});
    dispatch({type: types.RESET_TIMER});
    dispatch(StartTimer());
  };
};
export const SendMobileToValidate = () => {
  return (dispatch: any, getState: any) => {
    let {phoneNumber} = getState().AuthReducer;
    dispatch(RestTimer());
    auth()
      .signInWithPhoneNumber(`+2${phoneNumber}`)
      .then((res: any) => {
        if (res) {
          dispatch(changeAuthProps('isNumberVerified', true));
          dispatch(changeAuthProps('confirmCodeResult', res));
          clearInterval(timerInterval);
          dispatch({type: types.IS_RESEND_BUTTON_EXIST, payload: true});
        } else {
          dispatch(changeAuthProps('isNumberVerified', false));
        }
      })
      .catch((err: any) => {
        RNToasty.Error({title: err.message});
        clearInterval(timerInterval);
        dispatch({type: types.IS_RESEND_BUTTON_EXIST, payload: true});
        dispatch(changeAuthProps('isNumberVerified', false));
      });
  };
};

export const confirmCode = (navigation: any) => {
  return async (dispatch: any, getState: any) => {
    let {
      formikSetStatus,
      formikResetForm,
      confirmCodeResult,
      CodeNum1,
      CodeNum2,
      CodeNum3,
      CodeNum4,
      CodeNum5,
      CodeNum6,
    } = getState().AuthReducer;
    let code = `${CodeNum1}${CodeNum2}${CodeNum3}${CodeNum4}${CodeNum5}${CodeNum6}`;
    dispatch(changeAuthProps('isConfirmCodeLoading', true));
    const credential = auth.PhoneAuthProvider.credential(
      confirmCodeResult.verificationId,
      code,
    );

    return auth()
      .signInWithCredential(credential)
      .then((data: any) => {
        dispatch({
          type: types.SAVE_USER_INFORMATION,
          payload: data.user,
        });
        formikResetForm({});
        formikSetStatus({success: true});
        navigation.replace('TabScreen');
        RNToasty.Success({title: 'Code Sent Successfully'});
      })
      .catch(err => {
        RNToasty.Error({title: err.message});
      })
      .finally(() => dispatch(CloseConfirmationCode()));
  };
};

export const CloseConfirmationCode = () => {
  return (dispatch: any) => {
    dispatch(changeAuthProps('isConfirmCodeLoading', false));
    dispatch(changeAuthProps('formikSetStatus', null));
    dispatch(changeAuthProps('formikResetForm', null));
    dispatch(changeAuthProps('isVerificationModalVisible', false));
    dispatch(changeAuthProps('isNumberVerified', false));
    dispatch(changeAuthProps('CodeNum1', null));
    dispatch(changeAuthProps('CodeNum2', null));
    dispatch(changeAuthProps('CodeNum3', null));
    dispatch(changeAuthProps('CodeNum4', null));
    dispatch(changeAuthProps('CodeNum5', null));
    dispatch(changeAuthProps('CodeNum6', null));
  };
};
