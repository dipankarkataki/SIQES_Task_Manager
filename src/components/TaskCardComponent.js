import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'

const TaskCardComponent = ({category, title, description, status, priority, due_date, view_link }) => {
  return (
    <View style={styles.task_card_container}>
        <Text style={styles.task_title}>{title}</Text>
        <Text style={styles.task_description}>{description}</Text>
        <View style={styles.task_footer}>
            <View style={styles.task_status_container}>
                <Text style={styles.task_status_title}>Status: </Text>
                {status === 'pending' && (<Text style={{color: "crimson", fontFamily: "Roboto-Medium", fontSize: 16, textTransform: 'uppercase'}}>{status}</Text>) }
                {status === 'in_progress' && (<Text style={{color: "orange", fontFamily: "Roboto-Medium", fontSize: 16, textTransform: 'uppercase'}}>{status}</Text>) }
                {status === 'completed' && (<Text style={{color: "green", fontFamily: "Roboto-Medium", fontSize: 16, textTransform: 'uppercase'}}>{status}</Text>) }
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.view_task_button}>
                <Text style={styles.task_view_link}>View</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default TaskCardComponent

const styles = StyleSheet.create({
    task_card_container:{
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        elevation: 5,
        shadowColor: '#000',
        marginHorizontal: moderateScale(10),
    },
    task_title:{
        fontSize: scale(16),
        fontFamily: 'Roboto-Medium',
        color: 'rgba(0,0,0,0.8)',
        marginBottom: moderateVerticalScale(5),
    },
    task_description:{
        fontSize: scale(14),
        fontFamily: 'Roboto-Regular',
        color: '#333',
    },
    task_footer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateVerticalScale(10),
        padding: moderateScale(5),
        backgroundColor: '#fffafa',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: moderateScale(5),
    },
    task_status_container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    task_status_title:{
        fontFamily: 'Roboto-Medium',
        fontSize: scale(14),
        color: '#333',
    },
    task_status:{
        fontSize: scale(14),
        fontFamily: 'Roboto-Regular',
        color: '#333',
    },
    view_task_button:{
        backgroundColor: '#2E78FF',
        paddingVertical: moderateVerticalScale(5),
        paddingHorizontal: moderateScale(10),
        borderRadius: 5,
    },
    task_view_link:{
        fontSize: scale(14),
        fontFamily: 'Roboto-Medium',
        color: '#fff',
        textTransform: 'uppercase',
    }
});