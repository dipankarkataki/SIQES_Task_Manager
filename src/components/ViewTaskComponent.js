import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import UpdateTaskStatusApi from '../api/Tasks/UpdateTaskStatus/UpdateTaskStatusApi';
import { useNavigation } from '@react-navigation/native';
import constants from '../navigation/constants';

const ViewTaskComponent = ({ category, title, description, priority, due_date, status, remarks, task_id }) => {
    
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation();

    const updateStatus = async (status, task_id) => {
        
        let new_status = status === 'pending' ? 'in_progress' : 'completed';

        setLoader(true);
        try{
            const res = await UpdateTaskStatusApi({new_status, task_id});
            if(res.data?.success === true){
                Alert.alert('Task updated successfully', '', [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate(constants.DASHBOARD, {
                                screen: "TopTabsNavigator",
                                params: { screen: new_status === 'in_progress' ? "In Progress" : "Completed" }
                            });
                        },
                    },
                ]);
                
            }else{
                Alert.alert('Failed to updated task');
            }
        }catch(err){
            console.log('Failed to update task status: ', err)
        }finally{
            setLoader(false);
        }
       
    }

    return (
        <View style={styles.task_card_container}>
            <Text style={styles.task_title}>{title}</Text>
            <Text style={styles.task_category}>Category: {category}</Text>
            <View style={styles.description_wrapper}> 
                <Text style={styles.label}>Description: </Text>
                <Text style={styles.task_description}>{description}</Text>
            </View>
            {
                remarks && (
                    <View style={styles.remarks_wrapper}>
                        <Text style={styles.label}>Remarks: </Text>
                        <Text style={styles.task_remarks}>{remarks}</Text>
                    </View>
                )
            }
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
                <TouchableOpacity activeOpacity={0.8} style={[styles.update_task_button, status === 'completed' ? {backgroundColor: '#acacac'} : null]} disabled={status === 'completed' || loader} onPress={() => updateStatus(status, task_id)}>
                    <Text style={styles.task_view_link}>{loader ? 'Updating...' : 'Update Status'}</Text>
                    {
                        loader && (
                            <ActivityIndicator size="large" color='#FFF' style={styles.activity_indicator} animating={loader}/>
                        )
                    }
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ViewTaskComponent;

const styles = StyleSheet.create({
    task_card_container: {
        backgroundColor: '#fff',
        borderRadius: moderateScale(10),
        padding: moderateScale(10),
        marginVertical: moderateVerticalScale(10),
        elevation: 5,
        shadowColor: '#000',
        marginHorizontal: moderateScale(10)
    },
    task_title: {
        fontSize: scale(18),
        fontFamily: 'Roboto-Medium',
        color: 'rgba(28,40,65, 1)',
        marginBottom: moderateVerticalScale(5),
    },
    task_category: {
        fontFamily: "Roboto-Regular",
        fontSize: scale(15),
        color: 'rgb(105,105,105)',
    },
    label:{
        marginTop: moderateVerticalScale(10),
        fontSize: scale(15),
        fontFamily: 'Roboto-Medium',
        color: 'rgba(28,40,65, 0.8)',
    },
    description_wrapper:{

    },
    task_description: {
        fontSize: scale(14),
        fontFamily: 'Roboto-Regular',
        color: 'rgb(105,105,105)',
        textAlign: 'justify',
        paddingHorizontal: moderateScale(5),
        marginVertical: moderateVerticalScale(5),
    },
    task_body_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: moderateVerticalScale(5),
    },
    task_priority_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    task_priority_title: {
        fontSize: scale(14),
        fontFamily: 'Roboto-Medium',
        color: 'rgba(28,40,65, 0.8)',
    },
    task_due_date: {
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
    update_task_button: {
        flexDirection: 'row',
        backgroundColor: '#2E78FF',
        paddingVertical: moderateVerticalScale(5),
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        height: moderateScale(40)
    },
    task_view_link: {
        fontSize: scale(12),
        fontFamily: 'Roboto-Medium',
        color: '#fff',
        textTransform: 'uppercase',
    },
    remarks_wrapper: {
    },
    task_remarks: {
        fontSize: scale(14),
        fontFamily: 'Roboto-Regular',
        color: 'rgb(105,105,105)',
        textAlign: 'justify',
        paddingHorizontal: moderateScale(5),
        marginVertical: moderateVerticalScale(5),
    }
});