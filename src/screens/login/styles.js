import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  login_form_wrapper:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_form:{
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  login_form_header:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(20),
  },
  logo:{
    width: moderateScale(100),
    height: moderateScale(100),
  },
  text_input_wrapper:{
    marginBottom: moderateVerticalScale(20),
  },
  text_input_label:{
    marginBottom: moderateVerticalScale(5),
  },
  text_input:{
    width: '100%',
    height: moderateScale(40),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
  }
});