import { StyleSheet } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image_background: {
    flex: 1,
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScale(70),
    width: '100%',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    backgroundColor: '#2CABE2'
  },
  header_text: {
    fontSize: scale(20),
    fontFamily: 'Roboto-Medium',
    color: '#fff'
  },
  profile_image_container: {
    width: scale(38),
    height: scale(38),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#fff'
  },
  profile_image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(20),
  }
});