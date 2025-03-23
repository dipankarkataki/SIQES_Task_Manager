import { StyleSheet } from "react-native";
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image_background: {
    flex: 1,
  },
  scrollView_container: {
    paddingHorizontal: moderateScale(20),
  },
  header_container: {
    height: moderateScale(40),
    backgroundColor: '#2CABE2',
    paddingHorizontal: moderateScale(20),
    elevation: 3,
    paddingVertical: moderateVerticalScale(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  header_text: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: scale(18),
  },
  header_icon: {
    fontSize: scale(20),
    color: '#fff',
  },
  logo_area: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  logo_large: {
    width: moderateScale(200),
    resizeMode: 'contain'
  },
  form: {
    marginTop: moderateVerticalScale(60),
  },
  text_input_area: {
    marginBottom: moderateVerticalScale(20)
  },
  text_title: {
    color: '#535353',
    fontSize: scale(16),
    marginBottom: moderateVerticalScale(8),
    fontFamily: 'Roboto-Medium'
  },
  text_input: {
    flex: 1,
    fontSize: scale(14),
    color: '#535353',
    padding: moderateScale(12),
    fontFamily: 'Roboto-Regular'
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1F3FB',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    backgroundColor: '#fff',
    height: moderateScale(60)
  },
  icon: {
    marginHorizontal: moderateScale(10),
    color: 'black',
    backgroundColor: '#fff'
  },
  form_btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(10)
  },
  login_btn: {
    flexDirection: 'row',
    backgroundColor: '#FFB52E',
    borderRadius: moderateScale(10),
    width: '100%',
    height: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_btn_text: {
    color: '#000000',
    fontSize: scale(18),
    fontFamily: 'Roboto-Medium',

  },
  forgot_password: {
    color: '#E21C1C',
    fontSize: scale(14),
    fontFamily: 'Roboto-Medium'
  },
  signup_btn: {
    marginVertical: moderateVerticalScale(8),
  },
  signup_btn_text: {
    color: '#000000',
    fontFamily: 'Roboto-Medium'
  },
  signup_text: {
    color: '#2CABE2',
    fontFamily: 'Roboto-Medium'
  },
  error_text: {
    color: 'red',
    fontSize: scale(12),
    marginVertical: moderateVerticalScale(5)
  },
  activity_indicator: {
    marginHorizontal: moderateScale(10),
  },
});