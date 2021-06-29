import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useForm from '../../hooks/useForm';

const TodoForm = (props) => {
  const [handleSubmit, handleChange, item] = useForm(props.handleSubmit);

  return (
    <>
      <Card className='p-4'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <h3>Add To Do Item</h3>
            <Form.Label>To Do Item </Form.Label>
            <Form.Control
              name='text'
              type='text'
              placeholder='Add To Do List Item'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Difficulty Rating</Form.Label>
            <input
              className='form-control'
              defaultValue='1'
              type='range'
              min='1'
              max='5'
              name='difficulty'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type='text'
              name='assignee'
              placeholder='Assigned To'
              onChange={handleChange}
            />
          </Form.Group>
          <Button type='submit' className='w-50' variant='primary'>
            Add Item
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default TodoForm;
