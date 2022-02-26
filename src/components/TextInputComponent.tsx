import React, {PureComponent} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../assets/colors';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';
import Fonts from '../assets/Fonts';

interface TextInputComponentProps {
  value: any;
  onChangeText: (any: any) => any;
  onSubmitEditing: () => any;
  keyboardType: string | any;
  placeholder: string | any;
  inputRef?: any;
  error?: any;
  touched?: any;
  hasIcon?: boolean;
  secureTextEntry?: boolean;
  isPasswordField?: boolean;
  onPasswordIconPressed?: () => any;
  onBlur?: () => any;
  maxLength?: number;
  editable?: boolean;
  isForEditProfile?: boolean;
}
export default class TextInputComponent extends PureComponent<TextInputComponentProps> {
  render() {
    let {
      value,
      onChangeText,
      placeholder,
      keyboardType,
      inputRef,
      error,
      touched,
      onBlur,
      maxLength,
      hasIcon,
      onSubmitEditing,
      secureTextEntry = false,
      isPasswordField = false,
      onPasswordIconPressed,
      editable,
    } = this.props;
    return (
      <>
        <View
          style={[
            styles.inputContainer,
            {borderColor: error && touched ? 'red' : colors.ORANGE_COLOR},
          ]}>
          {hasIcon && (
            <View style={styles.userImgContainer}>
              <AntDesign
                name="user"
                size={20}
                style={{color: colors.MAIN_COLOR}}
              />
            </View>
          )}
          {isPasswordField && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPasswordIconPressed}
              style={styles.passwordContainer}>
              <Entypo
                name={secureTextEntry ? 'eye-with-line' : 'eye'}
                size={20}
                style={{color: colors.MAIN_COLOR}}
              />
            </TouchableOpacity>
          )}
          <TextInput
            value={value}
            ref={inputRef}
            editable={editable != null ? editable : true}
            placeholder={placeholder}
            placeholderTextColor={colors.MAIN_COLOR}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={maxLength ? maxLength : 100}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            blurOnSubmit
            onSubmitEditing={onSubmitEditing}
            selectionColor={colors.BLACK_COLOR}
            onBlur={onBlur}
            style={[
              styles.input,
              {width: hasIcon || isPasswordField ? scale(287) : scale(340)},
            ]}
          />
        </View>
        {error && touched ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTxt}>{error}</Text>
          </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: scale(342),
    height: verticalScale(55),
    backgroundColor: colors.WHITE_COLOR,
    borderRadius: moderateScale(7),
    justifyContent: 'flex-start',
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    borderWidth: scale(1),
    marginTop: verticalScale(15),
    borderColor: colors.MID_GRAY,
  },
  userImgContainer: {
    backgroundColor: colors.WHITE_COLOR,
    width: scale(50),
    borderTopRightRadius: moderateScale(8.5),
    borderBottomRightRadius: moderateScale(8.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordContainer: {
    width: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingVertical: verticalScale(8),
    color: colors.MAIN_COLOR,
    paddingHorizontal: scale(10),
    fontFamily: Fonts.REGULAR_FONT_EN,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: moderateScale(16),
  },
  errorTxt: {
    color: colors.ERROR_COLOR,
    fontFamily: Fonts.REGULAR_FONT_EN,
    alignSelf: 'flex-start',
    fontSize: moderateScale(12),
  },
  errorContainer: {
    width: '78%',
    alignSelf: 'center',
    marginTop: verticalScale(5),
  },
});
