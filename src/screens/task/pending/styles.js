import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
export const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tasks_scroll_container:{
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(20),
    },
    no_tasks_container:{
        flex: 1,
        height: moderateVerticalScale(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: moderateScale(10),
        borderColor: 'rgba(28,40,65, 0.1)',
        margin: moderateScale(20),
        shadowColor: 'rgba(28,40,65, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
        shadowOpacity: 0.8,
    },
    no_tasks:{
        fontSize: 20,
        fontFamily: 'Roboto-Medium',
        color: 'rgba(28,40,65, 0.7)',
    },
    shimmerContainer:{
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    shimmerHeaderContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: moderateVerticalScale(10),
        marginHorizontal: moderateScale(20),
    },
    shimmerHeaderPlaceholder: {
        height: moderateScale(50),
        width: moderateScale(50),
        borderWidth: 1,
        borderColor: '#f5f5f5',
        borderRadius: moderateScale(30),
    },
    shimmerBoxPlaceholder: {
        height: moderateScale(200),
        marginBottom: moderateVerticalScale(20),
        borderRadius: moderateScale(6),
        marginHorizontal: moderateScale(10),
        width: moderateScale(365),
    },
    shimmerViewPlaceholder: {
        height: moderateScale(60),
        marginBottom: moderateVerticalScale(20),
        borderRadius: moderateScale(6),
        marginHorizontal: moderateScale(10),
        width: moderateScale(365),
    },
});