import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useForm from '../../hooks/useForm';

const AuthPage = (props) => {
  const handleData = (items) => {
    console.log(items);
  };

  const [handleSubmit, handleChange] = useForm(handleData);

  return (
    <Card className='w-50 p-4 mx-auto my-5 shadow-lg bg-white rounded'>
      <Card.Header>
        {props.register ? 'Register a New Account' : 'Login With Your Account'}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicUserName'>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              name='username'
              onChange={handleChange}
              type='text'
              placeholder='Enter username'
              required
            />
          </Form.Group>
          {props.register && (
            <>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name='email'
                  onChange={handleChange}
                  type='email'
                  placeholder='Enter email'
                  required
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <select
                  name='user_type'
                  onChange={handleChange}
                  defaultValue='user'
                  className='form-control'
                >
                  <option value='user'>User</option>
                  <option value='editor'>Editor</option>
                  <option value='admin'>Admin</option>
                </select>
              </Form.Group>
            </>
          )}

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              onChange={handleChange}
              type='password'
              placeholder='Password'
              required
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            {props.register ? 'Register' : 'Login'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthPage;
