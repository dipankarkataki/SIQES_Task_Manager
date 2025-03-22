import React, { useEffect, useState } from 'react';
import CardComponent from '../../components/Card/Card';
import './styles.css';
import API from '../../services/Api';

const Dashboard = () => {

    const [taskCount, setTaskCount] = useState({
        total_tasks: 0,
        pending_tasks: 0,
        tasks_in_progress: 0,
        completed_tasks: 0
    });

    const getDashboardData = async () => {
        try {
            const res = await API.get("/task-management/task/get-all-task-with-count");
            if(res.data.success === true){
                setTaskCount({
                    total_tasks: res.data.data.total_tasks,
                    pending_tasks: res.data.data.pending_tasks,
                    tasks_in_progress: res.data.data.in_progress_tasks,
                    completed_tasks: res.data.data.completed_tasks
                });
            }
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDashboardData()
    }, []);

    return (

        <div className='dashboard-wrapper'>
            <h2 className='mx-3 my-3'>Dashboard</h2>
            <div className='card-wrapper'>
                <CardComponent task_title='Total Tasks' task_count={taskCount.total_tasks} view_link='/all-tasks' />
                <CardComponent task_title='Pending Tasks' task_count={taskCount.pending_tasks} view_link='/all-tasks' />
                <CardComponent task_title='Task In Progress' task_count={taskCount.tasks_in_progress} view_link='/all-tasks' />
                <CardComponent task_title='Completed Tasks' task_count={taskCount.completed_tasks} view_link='/all-tasks' />
            </div>
        </div>
    );
};

export default Dashboard;