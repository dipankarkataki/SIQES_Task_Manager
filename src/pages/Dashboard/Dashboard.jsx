import React, { useEffect } from 'react';
import CardComponent from '../../components/Card/Card';
import './styles.css';
import API from '../../services/Api';

const Dashboard = () => {

    const getDashboardData = async () => {
        try {
            const { data } = await API.get("/dashboard");
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDashboardData()
    }, []);

    return (

        <div className='dashboard-wrapper'>
            <h2>Dashboard</h2>
            <div className='card-wrapper'>
                <CardComponent task_title='Total Tasks' task_count='10' view_link='/all-tasks' />
                <CardComponent task_title='Pending Tasks' task_count='5' view_link='/all-tasks' />
                <CardComponent task_title='Task In Progress' task_count='15' view_link='/all-tasks' />
                <CardComponent task_title='Completed Tasks' task_count='35' view_link='/all-tasks' />
            </div>
        </div>
    );
};

export default Dashboard;