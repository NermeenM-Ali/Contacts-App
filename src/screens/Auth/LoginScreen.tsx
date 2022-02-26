import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import colors from '../../assets/colors';
import TextInputComponent from '../../components/TextInputComponent';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import ImageLogoSection from './AuthComponents/ImageLogoSection';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {verticalScale} from '../../utils/Scaling';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  changeAuthProps,
  handleUserRegisteration,
} from '../../redux/actions/AuthAction';
import {RootState} from '../../redux/Configration';
import CustomLinkButton from '../../components/CustomLinkButton';

const loginLoadingSelectorFunction = (state: RootState) =>
  state.AuthReducer.isLoginLoading;
const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const isLoginLoading = useSelector(loginLoadingSelectorFunction);
  const dispatch = useDispatch();
  const inputsField: any = useRef({});

  const applyFocus = useCallback((inputName: string) => {
    setTimeout(() => {
      inputsField.current[inputName].focus();
    }, 0.5);
  }, []);

  const renderInputs = () => {
    const initialData = {
      email: '',
      password: '',
    };
    const ValidationSchema = Yup.object().shape({
      email: Yup.string().email().required('required'),
      password: Yup.string()
        .min(4, 'Password must have at least 4 characters ')
        .required('required'),
    });
    return (
      <Formik
        initialValues={initialData}
        validationSchema={ValidationSchema}
        onSubmit={onSubmitLogin}>
        {formikProps => (
          <View style={styles.inputsContainer}>
            <TextInputComponent
              value={formikProps.values.email}
              onChangeText={formikProps.handleChange('email')}
              placeholder={'Enter Email..'}
              keyboardType="email-address"
              hasIcon={true}
              inputRef={(input: any) => {
                inputsField.current.email = input;
              }}
              error={formikProps.errors.email}
              touched={formikProps.touched.email}
              onSubmitEditing={() => {
                applyFocus('password');
                Keyboard.dismiss();
              }}
            />

            <TextInputComponent
              value={formikProps.values.password}
              onChangeText={formikProps.handleChange('password')}
              placeholder={'Password'}
              keyboardType="default"
              isPasswordField
              hasIcon={false}
              secureTextEntry={!isPasswordVisible}
              onPasswordIconPressed={() =>
                setPasswordVisibility(!isPasswordVisible)
              }
              inputRef={(input: any) => {
                inputsField.current.password = input;
              }}
              error={formikProps.errors.password}
              touched={formikProps.touched.password}
              onSubmitEditing={() => Keyboard.dismiss()}
            />

            <CustomButton
              btnTitle={'Login'}
              isLoading={isLoginLoading}
              btnBgColor={colors.ORANGE_COLOR}
              onPress={formikProps.handleSubmit}
            />
            <CustomLinkButton
              btnText={'Login With Phone Number'}
              onPress={() => navigation.navigate('LoginWithPhoneNumberScreen')}
            />
          </View>
        )}
      </Formik>
    );
  };

  const onSubmitLogin = useCallback(
    async (values: any, {setStatus, resetForm}: any) => {
      let {email, password} = values;
      dispatch(changeAuthProps('formikResetForm', resetForm));
      dispatch(changeAuthProps('formikSetStatus', setStatus));
      dispatch(handleUserRegisteration(email, password, navigation));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <ImageLogoSection title={'Contacts App'} />
      {renderInputs()}
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
});

export default LoginScreen;
