import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './styles.css';
import taskImage from '../../assets/task.jpg';

const  CardComponent = ({task_title, task_count, view_link}) => {
  return (
    <Card className='card-container'>
      <Card.Img variant="top" className="card-image" src={taskImage} />
      <Card.Body>
        <Card.Title>{task_title}</Card.Title>
        <Card.Text className='task-count'>
          {task_count}
        </Card.Text>
        <Link to="/" className='card_link'>View Task</Link>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;