import React, { useEffect, useContext } from 'react';
import { authContext } from '../../context/auth/context';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useForm from '../../hooks/useForm';
import useAjax from '../../hooks/useAjax';

const signinUrl = 'https://api-js401.herokuapp.com/signin';
const signupUrl = 'https://api-js401.herokuapp.com/signup';

const AuthPage = (props) => {
  const [results, request] = useAjax();
  const { login } = useContext(authContext);

  const handleAuth = (items) => {
    if (props.register) {
      const reqBody = {
        username: items.username,
        email: items.email,
        role: items.role,
        password: items.password,
      };
      request(signupUrl, 'post', reqBody);
    } else {
      const authParams = {
        username: items.username,
        password: items.password,
      };
      request(signinUrl, 'post', {}, authParams);
    }
  };

  const [handleSubmit, handleChange] = useForm(handleAuth);

  useEffect(() => {
    if (results) {
      if (!props.register) {
        login(results.data.user, results.data.token);
      }else{
        props.history.push('/');
      }
    }
  }, [results]);

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
                  name='role'
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
        <Card.Footer>
          <Card.Text>
            {props.register
              ? `Already have an account `
              : `Don't have an account `}
            {props.register ? (
              <Link to='/login'>Login</Link>
            ) : (
              <Link to='/register'>Register</Link>
            )}
          </Card.Text>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default AuthPage;
