import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import ViewTaskComponent from '../../../components/ViewTaskComponent';
import { useRoute } from '@react-navigation/native';
import TaskByIdApi from '../../../api/Tasks/TaskById/TaskByIdApi';

const ViewTask = ({ navigation }) => {

  const profile_image = require('../../../assets/images/profile.jpg');
  const route = useRoute();
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getTaskById = async () => {
    setIsLoading(true);
    try {
      const res = await TaskByIdApi(taskId);
      console.log('Task by Id data: ',res.data);
      if (res.data?.success === true) {
        setTask(Array.isArray(res.data.data) ? res.data.data[0] : res.data.data);
      } else {
        console.log('Error fetching task by id')
      }
    } catch (err) {
      console.log('Something went wrong while fetching task by id ', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTaskById();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>View Task</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.profile_image_container} onPress={() => navigation.navigate('Profile')}>
          <Image source={profile_image} style={styles.profile_image} />
        </TouchableOpacity>
      </View>
      <ViewTaskComponent category={task?.category?.title} title={task?.title} description={task?.description} 
      priority={task?.priority} due_date={task?.due_date} status={task?.status} remarks={task?.remarks} />
    </SafeAreaView>
  )
}

export default ViewTask;