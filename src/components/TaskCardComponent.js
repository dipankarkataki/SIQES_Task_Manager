import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'

const TaskCardComponent = ({ title, description, status, priority, due_date, view_link }) => {
    return (
        <View style={styles.task_card_container}>
            <Text numberOfLines={5} style={styles.task_title}>{title}</Text>
            <Text numberOfLines={5} style={styles.task_description}>{description}</Text>
            <View style={styles.task_body_container}>
                <View style={styles.task_priority_container}>
                    <Text style={styles.task_priority_title}>Priority: </Text>
                    {priority === 'high' && (<Text style={{ color: "crimson", fontFamily: "Roboto-Medium", fontSize: 16, textTransform: 'capitalize' }}>{priority}</Text>)}
                    {priority === 'medium' && (<Text style={{ color: "orange", fontFamily: "Roboto-Medium", fontSize: 16, textTransform: 'capitalize' }}>{priority}</Text>)}
                    {priority === 'low' && (<Text style={{ color: "green", fontFamily: "Roboto-Medium", fontSize: 16, textTransform: 'capitalize' }}>{priority}</Text>)}
                </View>
                <Text style={styles.task_due_date}>
                    Due Date: {due_date}
                </Text>
            </View>
            <View style={styles.task_footer}>
                <View style={styles.task_status_container}>
                    <Text style={styles.task_status_title}>Status: </Text>
                    {status === 'pending' && (<Text style={{ color: "crimson", fontFamily: "Roboto-Medium", fontSize: 16, textTransform: 'uppercase' }}>{status}</Text>)}
                    {status === 'in_progress' && (<Text style={{ color: "orange", fontFamily: "Roboto-Medium", fontSize: 16, textTransform: 'uppercase' }}>{status}</Text>)}
                    {status === 'completed' && (<Text style={{ color: "green", fontFamily: "Roboto-Medium", fontSize: 16, textTransform: 'uppercase' }}>{status}</Text>)}
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.view_task_button} onPress={view_link}>
                    <Text style={styles.task_view_link}>View Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TaskCardComponent

const styles = StyleSheet.create({
    task_card_container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        elevation: 5,
        shadowColor: '#000',
        marginHorizontal: moderateScale(10),
    },
    task_title: {
        fontSize: scale(18),
        fontFamily: 'Roboto-Medium',
        color: 'rgba(28,40,65, 1)',
        marginBottom: moderateVerticalScale(5),
    },
    task_description: {
        fontSize: scale(15),
        fontFamily: 'Roboto-Regular',
        color: 'rgb(105,105,105)',
        textAlign: 'justify',
        paddingRight: moderateScale(10),
        marginVertical: moderateVerticalScale(5),
    },
    task_body_container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: moderateVerticalScale(5),
    },
    task_priority_container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    task_priority_title:{
        fontSize: scale(14),
        fontFamily: 'Roboto-Medium',
        color: 'rgba(28,40,65, 0.8)',
    },
    task_due_date:{
        fontSize: scale(14),
        fontFamily: 'Roboto-Medium',
        color: 'rgba(28,40,65, 0.8)',
        textTransform: 'capitalize',
    },
    task_footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateVerticalScale(10),
        padding: moderateScale(5),
        backgroundColor: '#f8f8ff',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: moderateScale(5),
    },
    task_status_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    task_status_title: {
        fontFamily: 'Roboto-Medium',
        fontSize: scale(14),
        color: '#333',
    },
    task_status: {
        fontSize: scale(14),
        fontFamily: 'Roboto-Regular',
        color: 'rgba(28,40,65, 0.8)',
    },
    view_task_button: {
        backgroundColor: '#2E78FF',
        paddingVertical: moderateVerticalScale(5),
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(5),
    },
    task_view_link: {
        fontSize: scale(12),
        fontFamily: 'Roboto-Medium',
        color: '#fff',
        textTransform: 'uppercase',
    }
});