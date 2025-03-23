import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import CompletedTaskApi from '../../../api/Tasks/Completed/CompletedTaskApi';
import TaskCardComponent from '../../../components/TaskCardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Completed = () => {

  const [shimmerLoading, setShimmerLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  const getCompletedTasks = async () => {
    setShimmerLoading(true);
    try {
      const res = await CompletedTaskApi();
      console.log('Completed Tasks: ', res.data);
      if (res.data?.success === true) {
        setPendingTasks(res.data.data);
      } else {
        console.log('Error Fetching Completed Tasks: ', res.data?.message);
      }
    } catch (err) {
      console.log('Error Fetching Completed Tasks: ', err);
    } finally {
      setShimmerLoading(false);
    }

  };

  useFocusEffect(
    React.useCallback(() => {
      getCompletedTasks();
    }, [])
  );

  return (
    <View>
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
          <ScrollView style={styles.tasks_scroll_container}>
            {
              completedTasks.length > 0 ? (
                completedTasks.map((task, index) => (
                  <TaskCardComponent
                    key={index}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    due_date={task.due_date}
                    view_link={'/pending/' + task.id}
                  />
                ))
              ) : (
                <View style={styles.no_tasks_container}>
                  <Text style={styles.no_tasks}>No Completed Tasks</Text>
                </View>

              )
            }
          </ScrollView>
        )
      }
    </View>
  )
}

export default Completed;