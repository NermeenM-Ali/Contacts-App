import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors';
import Fonts from '../assets/Fonts';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';

interface SearchInputProps {
  value: any;
  onChangeText: (any: any) => any;
  onSubmitEditing: () => any;
  placeHolder: string | any;
  inputRef?: any;
  maxLength?: number;
}
export default class SearchInput extends Component<SearchInputProps> {
  render() {
    let {
      maxLength,
      value,
      onChangeText,
      placeHolder,
      inputRef,
      onSubmitEditing,
    } = this.props;
    return (
      <>
        <View style={[styles.inputContainer]}>
          <View style={styles.iconContainer}>
            <Ionicons name={'ios-search'} size={20} style={styles.searchIcon} />
          </View>

          <TextInput
            value={value}
            ref={inputRef}
            placeholder={placeHolder}
            placeholderTextColor={colors.MAIN_COLOR}
            secureTextEntry={false}
            maxLength={maxLength ? maxLength : 200}
            autoCapitalize="none"
            autoCorrect={false}
            selectionColor={colors.MAIN_COLOR}
            keyboardType={'default'}
            returnKeyType="search"
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            style={[styles.input]}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: scale(360),
    height: verticalScale(50),
    backgroundColor: colors.SHADOW_COLOR,
    borderRadius: moderateScale(7),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: scale(1.5),
    marginTop: verticalScale(15),
    paddingTop: 1,
    borderColor: colors.LIGHT_GRAY_COLOR,
  },
  iconContainer: {
    position: 'absolute',
    right: scale(10),
    top: verticalScale(10),
  },
  input: {
    width: scale(265),
    height: verticalScale(50),
    color: colors.MAIN_COLOR,
    paddingHorizontal: scale(10),
    fontFamily: Fonts.REGULAR_FONT_EN,
    fontSize: moderateScale(15),
  },
  searchIcon: {
    marginTop: verticalScale(2),
    color: colors.MAIN_COLOR,
  },
});
