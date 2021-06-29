import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from '../Card/Card';

const TodoList = (props) => {
  return (
    <ListGroup className='ml-4'>
      {props.list.map((item) => (
        <Card
          item={item}
          handleComplete={props.handleComplete}
          handleDelete={props.handleDelete}
        />
      ))}
    </ListGroup>
  );
};

export default TodoList;
