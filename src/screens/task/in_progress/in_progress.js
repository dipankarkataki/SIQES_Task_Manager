import { View, Text} from 'react-native';
import React, {useState } from 'react';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import InProgressTaskApi from '../../../api/Tasks/InProgress/InProgressTaskApi';
import TaskCardComponent from '../../../components/TaskCardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const InProgress = () => {

  const [shimmerLoading, setShimmerLoading] = useState(false);
  const [inProgressTasks, setInProgressTasks] = useState([]);

  const getInProgressTasks = async () => {
    setShimmerLoading(true);
    try {
      const res = await InProgressTaskApi();
      console.log('In Progress Tasks: ', res.data);
      if (res.data?.success === true) {
        setInProgressTasks(res.data.data);
      } else {
        console.log('Error Fetching In Progress Tasks: ', res.data?.message);
      }
    } catch (err) {
      console.log('Error Fetching In Progress Tasks: ', err);
    } finally {
      setShimmerLoading(false);
    }

  };

  useFocusEffect(
    React.useCallback(() => {
      getInProgressTasks();
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
              inProgressTasks.length > 0 ? (
                inProgressTasks.map((task, index) => (
                  <TaskCardComponent
                    key={index}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    due_date={task.due_date}
                    view_link={'/in-progress/' + task.id}
                  />
                ))
              ) : (
                <View style={styles.no_tasks_container}>
                  <Text style={styles.no_tasks}>No In Progress Tasks</Text>
                </View>

              )
            }
          </ScrollView>
        )
      }
    </View>
  )
}

export default InProgress;