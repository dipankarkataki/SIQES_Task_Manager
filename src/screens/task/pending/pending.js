import { View, Text, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import PendingTaskApi from '../../../api/Tasks/Pending/PendingTaskApi';
import TaskCardComponent from '../../../components/TaskCardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Pending = () => {

  const [shimmerLoading, setShimmerLoading] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const backgroundImage = require('../../../assets/images/background.png');

  const getPendingTasks = async () => {
    setShimmerLoading(true);
    try {
      const res = await PendingTaskApi();
      console.log('Pending Tasks: ', res.data);
      if (res.data?.success === true) {
        setPendingTasks(res.data.data);
      } else {
        console.log('Error Fetching Pending Tasks: ', res.data?.message);
      }
    } catch (err) {
      console.log('Error Fetching Pending Tasks: ', err);
    } finally {
      setShimmerLoading(false);
    }

  };

  useFocusEffect(
    React.useCallback(() => {
      getPendingTasks();
    }, [])
  );

  return (
    <View style={styles.container}>
      {
        shimmerLoading ? (
          <View style={styles.shimmerContainer}>
            <View style={styles.shimmerHeaderContainer}>
            </View>
            <ShimmerPlaceholder style={styles.shimmerBoxPlaceholder} />
            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
            <ShimmerPlaceholder style={styles.shimmerBoxPlaceholder} />
            <ShimmerPlaceholder style={styles.shimmerViewPlaceholder} />
          </View>
        ) : (
          <ImageBackground source={backgroundImage} style={styles.image_background}>
            <ScrollView style={styles.tasks_scroll_container}>
              {
                pendingTasks.length > 0 ? (
                  pendingTasks.map((task) => (
                    <TaskCardComponent
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      priority={task.priority}
                      due_date={task.due_date}
                      view_link={task.id}
                    />
                  ))
                ) : (
                  <View style={styles.no_tasks_container}>
                    <Text style={styles.no_tasks}>No Pending Tasks</Text>
                  </View>

                )
              }
            </ScrollView>
          </ImageBackground>
        )
      }
    </View>
  )
}

export default Pending;