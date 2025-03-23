import { StyleSheet } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
export const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tasks_scroll_container:{
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(20),
    }
});