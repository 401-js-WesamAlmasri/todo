import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const TodoList = (props) => {
    return (
      <ListGroup className='w-75 ml-4'>
        {props.list.map((item) => (
          <ListGroup.Item
            variant={item.complete ? 'danger' : 'success'}
            className={`complete-${item.complete.toString()}`}
            key={item._id}
            onClick={() => props.handleComplete(item._id)}
            >
              {item.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
}

export default TodoList;
