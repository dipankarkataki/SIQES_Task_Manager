import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import PendingTaskApi from '../../../api/Tasks/Pending/PendingTaskApi';
import TaskCardComponent from '../../../components/TaskCardComponent';
import { ScrollView } from 'react-native-gesture-handler';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Pending = () => {

  const [shimmerLoading, setShimmerLoading] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);

  const getPendingTasks = async () => {
    setShimmerLoading(true);
    try {
      const res = await PendingTaskApi();
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

  useEffect(() => {
    getPendingTasks();
  }, []);

  return (
    <View>
      {
        shimmerLoading ? (
          <View style={styles.shimmer_container}>
            <ShimmerPlaceholder style={styles.shimmer_title} />
            <ShimmerPlaceholder style={styles.shimmer_task} />
            <ShimmerPlaceholder style={styles.shimmer_task} />
            <ShimmerPlaceholder style={styles.shimmer_task} />
            <ShimmerPlaceholder style={styles.shimmer_task} />
          </View>
        ) : (
          <ScrollView style={styles.tasks_scroll_container}>
              {
                pendingTasks.length > 0 ? (
                  pendingTasks.map((task, index) => (
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
                  <Text style={styles.no_tasks}>No Pending Tasks</Text>
                )
              }
            </ScrollView>
        )
      }
    </View>
  )
}

export default Pending;