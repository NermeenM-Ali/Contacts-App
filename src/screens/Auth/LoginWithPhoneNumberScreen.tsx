import React, {useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ActivityIndicator,
  I18nManager,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Modal from 'react-native-modal';
import colors from '../../assets/colors';
import TextInputComponent from '../../components/TextInputComponent';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import ImageLogoSection from './AuthComponents/ImageLogoSection';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {
  changeAuthProps,
  CloseConfirmationCode,
  confirmCode,
  SendMobileToValidate,
} from '../../redux/actions/AuthAction';
import {RootState} from '../../redux/Configration';
import CustomLinkButton from '../../components/CustomLinkButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OtpInput from '../../components/OTPInput';
import Fonts from '../../assets/Fonts';
import {RNToasty} from 'react-native-toasty';

const authSelectorFunction = (state: RootState) => state.AuthReducer;

const LoginWithPhoneNumberScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {
    isLoginLoading,
    isVerificationModalVisible,
    phoneNumber,
    CodeNum1,
    CodeNum2,
    CodeNum3,
    CodeNum4,
    CodeNum5,
    CodeNum6,
    isNumberVerified,
    isConfirmCodeLoading,
    isResendButtonExist,
    mins,
    secs,
  } = useSelector(authSelectorFunction);
  const dispatch = useDispatch();
  const inputsField: any = useRef({});

  const applyFocus = useCallback((inputName: string) => {
    setTimeout(() => {
      inputsField.current[inputName].focus();
    }, 0.5);
  }, []);

  const renderInputs = () => {
    const initialData = {
      phoneNumber: '',
    };
    const ValidationSchema = Yup.object().shape({
      phoneNumber: Yup.string().required('required'),
    });
    return (
      <Formik
        initialValues={initialData}
        validationSchema={ValidationSchema}
        onSubmit={onSubmitLogin}>
        {formikProps => (
          <View style={styles.inputsContainer}>
            <TextInputComponent
              value={formikProps.values.phoneNumber}
              onChangeText={phoneNumber => {
                formikProps.setFieldValue('phoneNumber', phoneNumber);
                dispatch(changeAuthProps('phoneNumber', phoneNumber));
              }}
              placeholder={'Enter Phone Number..'}
              keyboardType="numeric"
              hasIcon={true}
              error={formikProps.errors.phoneNumber}
              touched={formikProps.touched.phoneNumber}
              onSubmitEditing={() => {
                formikProps.handleSubmit();
                Keyboard.dismiss();
              }}
            />
            <CustomButton
              btnTitle={'Login'}
              isLoading={isLoginLoading}
              btnBgColor={colors.ORANGE_COLOR}
              onPress={formikProps.handleSubmit}
            />
            <CustomLinkButton
              btnText={'Login With Email And Password'}
              onPress={() => navigation.goBack()}
            />
          </View>
        )}
      </Formik>
    );
  };

  const renderConfirmPhoneNumberForm = () => {
    return (
      <Modal
        isVisible={isVerificationModalVisible}
        onBackButtonPress={() =>
          dispatch(changeAuthProps('isVerificationModalVisible', true))
        }>
        <View style={styles.confirmNumberContainer}>
          {!isConfirmCodeLoading ? (
            <TouchableOpacity
              style={[styles.closeButton]}
              activeOpacity={0.8}
              onPress={() => dispatch(CloseConfirmationCode())}>
              <Ionicons name="ios-close" style={styles.closeIcon} />
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyView} />
          )}
          <View style={styles.mobileContainer}>
            <View style={styles.checkMarkNumberContainer}>
              <View style={styles.successMsgContainer}>
                <Ionicons name="checkmark" style={styles.rightIcon} />
                <Text
                  style={
                    styles.confirmMsgTxt
                  }>{`${'You will recieve OTP on No:'} ${phoneNumber}`}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => dispatch(SendMobileToValidate())}>
              {isResendButtonExist ? (
                <Text style={styles.resend}>{'Resend OTP'}</Text>
              ) : (
                <View style={styles.timerContainer}>
                  <Text style={styles.resendTimerTxt}>{`${mins}:${secs}`}</Text>
                  <Text style={styles.waitTxt}>{'Please wait...'}</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.codeInputsContainer}>
              <Text style={styles.codeTitle}>{'Enter OTP Code'}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: verticalScale(15),
                }}>
                <OtpInput
                  value={CodeNum1}
                  onChangeText={(CodeNum1: string) => {
                    dispatch(changeAuthProps('CodeNum1', CodeNum1));
                    CodeNum1 && applyFocus('codeNum2Field');
                  }}
                  onSubmitEditing={() => applyFocus('codeNum2Field')}
                />

                <OtpInput
                  value={CodeNum2}
                  inputRef={(input: any) => {
                    inputsField.current.codeNum2Field = input;
                  }}
                  onChangeText={(CodeNum2: string) => {
                    dispatch(changeAuthProps('CodeNum2', CodeNum2));
                    CodeNum2 && applyFocus('codeNum3Field');
                  }}
                  onSubmitEditing={() => applyFocus('codeNum3Field')}
                />

                <OtpInput
                  value={CodeNum3}
                  inputRef={(input: any) => {
                    inputsField.current.codeNum3Field = input;
                  }}
                  onChangeText={(CodeNum3: string) => {
                    dispatch(changeAuthProps('CodeNum3', CodeNum3));
                    CodeNum3 && applyFocus('codeNum4Field');
                  }}
                  onSubmitEditing={() => applyFocus('codeNum4Field')}
                />

                <OtpInput
                  value={CodeNum4}
                  inputRef={(input: any) => {
                    inputsField.current.codeNum4Field = input;
                  }}
                  onChangeText={(CodeNum4: string) => {
                    dispatch(changeAuthProps('CodeNum4', CodeNum4));
                    CodeNum4 && applyFocus('codeNum5Field');
                  }}
                  onSubmitEditing={() => applyFocus('codeNum5Field')}
                />

                <OtpInput
                  value={CodeNum5}
                  inputRef={(input: any) => {
                    inputsField.current.codeNum5Field = input;
                  }}
                  onChangeText={(CodeNum5: string) => {
                    dispatch(changeAuthProps('CodeNum5', CodeNum5));
                    CodeNum5 && applyFocus('codeNum6Field');
                  }}
                  onSubmitEditing={() => applyFocus('codeNum6Field')}
                />

                <OtpInput
                  value={CodeNum6}
                  inputRef={(input: any) => {
                    inputsField.current.codeNum6Field = input;
                  }}
                  onChangeText={(CodeNum6: string) => {
                    dispatch(changeAuthProps('CodeNum6', CodeNum6));
                    CodeNum6 && dispatch(confirmCode(navigation));
                  }}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(confirmCode(navigation));
                }}
                style={styles.confirmContainer}>
                {isConfirmCodeLoading ? (
                  <ActivityIndicator color={colors.WHITE_COLOR} size="small" />
                ) : (
                  <Text style={styles.confirmTxt}>{'Confirm'}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const onSubmitLogin = async (_: any, {setStatus, resetForm}: any) => {
    if (!isNumberVerified) {
      dispatch(SendMobileToValidate());
      dispatch(changeAuthProps('isVerificationModalVisible', true));
      dispatch(changeAuthProps('formikResetForm', resetForm));
      dispatch(changeAuthProps('formikSetStatus', setStatus));
    }
  };

  return (
    <View style={styles.container}>
      <ImageLogoSection title={'Contacts App'} />
      {renderInputs()}
      {renderConfirmPhoneNumberForm()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN_COLOR,
  },
  inputsContainer: {
    flex: 1,
    marginTop: verticalScale(50),
  },
  confirmContainer: {
    width: scale(150),
    paddingVertical: verticalScale(7),
    borderRadius: moderateScale(7),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.MID_GREEN,
    marginTop: verticalScale(50),
  },
  emptyView: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(30) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: scale(10),
    marginTop: verticalScale(5),
  },
  codeInputsContainer: {
    width: '100%',
    height: verticalScale(90),
    alignSelf: 'center',
    marginTop: verticalScale(10),
  },
  codeTitle: {
    fontSize: moderateScale(18),
    alignSelf: 'center',
    color: colors.TITLE_COLOR,
    fontFamily: Fonts.REGULAR_FONT_EN,
    textAlign: 'center',
  },
  confirmTxt: {
    fontFamily: I18nManager.isRTL
      ? Fonts.REGULAR_FONT_AR
      : Fonts.REGULAR_FONT_EN,
    fontSize: moderateScale(14),
    color: colors.WHITE_COLOR,
  },

  toggleContainer: {
    width: scale(51),
    height: verticalScale(31),
    borderRadius: moderateScale(25),
    padding: 5,
    elevation: 0.5,
  },
  toggleCircleContainer: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(20) / 2,
  },
  resend: {
    color: colors.MID_GREEN,
    textDecorationLine: 'underline',
    textDecorationColor: colors.MID_GREEN,
    textAlign: 'left',
    fontFamily: Fonts.BOLD_FONT_EN,
    paddingHorizontal: scale(5),
    paddingTop: verticalScale(10),
  },
  resendTimerTxt: {
    color: colors.MID_GREEN,
    textDecorationColor: colors.MID_GREEN,
    textAlign: 'left',
    fontFamily: Fonts.REGULAR_FONT_EN,
    paddingHorizontal: scale(5),
    paddingTop: verticalScale(10),
    marginRight: scale(5),
  },
  timerContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  waitTxt: {
    color: colors.MID_GREEN,
    textDecorationColor: colors.MID_GREEN,
    textAlign: 'left',
    fontFamily: Fonts.BOLD_FONT_EN,
    paddingTop: verticalScale(10),
  },
  confirmNumberContainer: {
    width: scale(343),
    height: verticalScale(330),
    marginTop: verticalScale(50),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    elevation: 0.5,
    alignSelf: 'center',
    shadowColor: '#B2B2B229',
    shadowRadius: scale(5),
    shadowOpacity: scale(15),
    shadowOffset: {width: scale(-5), height: verticalScale(10)},
  },
  closeButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(30) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: scale(10),
    marginTop: verticalScale(5),
    borderColor: colors.ERROR_COLOR,
    borderWidth: scale(1),
  },
  rightIcon: {
    fontSize: moderateScale(15),
    alignSelf: 'center',
    marginHorizontal: scale(5),
    color: colors.SUCCESS_COLOR,
  },
  closeIcon: {
    color: colors.ERROR_COLOR,
    fontSize: moderateScale(20),
  },
  confirmMsgTxt: {
    fontSize: moderateScale(12),
    alignSelf: 'center',
    color: colors.SUCCESS_COLOR,
    fontFamily: Fonts.REGULAR_FONT_EN,
  },
  mobileContainer: {
    width: scale(302),
    height: verticalScale(50),
    alignSelf: 'center',
    borderRadius: moderateScale(5),
  },
  successMsgContainer: {
    height: verticalScale(35),
    backgroundColor: colors.LIGHT_GREEN,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    paddingHorizontal: scale(7),
    marginVertical: verticalScale(3),
  },
  checkMarkNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default LoginWithPhoneNumberScreen;
