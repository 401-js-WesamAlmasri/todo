import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TodoList = (props) => {
  return (
    <ListGroup className='ml-4'>
      {props.list.map((item) => (
        <ListGroup.Item
          variant={item.complete ? 'danger' : 'success'}
          key={item._id}
        >
          <Row>
            <Col
              className='col-8' 
              onClick={() => props.handleComplete(item._id)}
            >
              {item.text}
            </Col>
            <Col 
              className='col-3'
              onClick={() => props.handleComplete(item._id)}  
            >{item.assignee}</Col>
            <Col
              className='col-1 text-danger delete-btn'
              onClick={() => props.handleDelete(item._id)} 
            >
              X
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TodoList;
