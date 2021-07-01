import React, { useContext, useRef } from 'react';
import { settingContext } from '../../context/settings/context';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useForm from '../../hooks/useForm';
import LoggedIn from '../../components/LoggedIn/LoggedIn';

const SettingPage = (props) => {
  const settingState = useContext(settingContext);
  const btnRef = useRef(null);

  const savePreferences = (items) => {
      btnRef.current.innerText = 'Saving'
      settingState.setHideCompleteItem(() => items.hideCompleteItem === 'true' ? true : false);
      settingState.setPageSize(() => parseInt(items.pageSize));
      settingState.setSortField(() => items.sortField);
      localStorage.setItem('preferences', JSON.stringify(items));
      setTimeout(() => btnRef.current.innerText = 'Save preferences', 500);
  };
  const initialState = {
    hideCompleteItem: settingState.hideCompleteItem,
    pageSize: parseInt(settingState.pageSize),
    sortField: settingState.sortField
  }
  const [handleSubmit, handleChange] = useForm(savePreferences, initialState, false);

  return (
    <div className='d-flex justify-content-center'>
      <Card className='text-center my-5 shadow-lg p-3 mb-5 bg-white rounded'>
        <Card.Header>Preferences Settings</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formPageSize'>
              <Form.Label>Number of items per page</Form.Label>
              <Form.Control
                name='pageSize'
                onChange={handleChange}
                defaultValue={settingState.pageSize}
                type='number'
                placeholder='items per page'
              />
              <Form.Text className='text-muted'>
                Select how many items you want to see per page screen
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Check
                name='hideCompleteItem'
                onChange={handleChange}
                defaultChecked={settingState.hideCompleteItem}
                type='checkbox'
                label='Hide Completed item'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <select
                name='sortField'
                onChange={handleChange}
                defaultValue={settingState.sortField}
                className='form-control'
              >
                <option>Sorted field</option>
                <option value='difficulty'>Difficulty</option>
                <option value='_id'>Due Date</option>
                <option value='complete'>Completeness</option>
              </select>
              <Form.Text className='text-muted'>
                Select how you would like to sort to dos tasks
              </Form.Text>
            </Form.Group>
            <Button ref={btnRef} variant='primary' type='submit'>
              Save preferences
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoggedIn(SettingPage);
