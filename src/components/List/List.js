import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from '../Card/Card';

const TodoList = (props) => {
  return (
    <ListGroup className='ml-4'>
      {props.list.map((item) => (
        <Card
          key={item._id}
          item={item}
          handleComplete={props.handleComplete}
          handleDelete={props.handleDelete}
          handleUpdate={props.handleUpdate}
        />
      ))}
    </ListGroup>
  );
};

export default TodoList;
