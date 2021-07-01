import React, { useState, useEffect } from 'react';
import TodoForm from '../../components/Form/Form.js';
import TodoList from '../../components/List/List.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useAjax from '../../hooks/useAjax';
import Spinner from 'react-bootstrap/Spinner';
import LoggedIn from '../../components/LoggedIn/LoggedIn';

import './HomePage.scss';
import MainHeader from '../../components/MainHeader/MainHeader.js';
import CheckAuth from '../../components/CheckAuth/CheckAuth.js';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const HomePage = (props) => {
  console.log('home render');
  // states for fetching api
  const [list, setList] = useState([]);
  const [results] = useAjax(todoAPI, 'get', null);
  const [addedItem, addItemReload] = useAjax();
  const [deletedItem, deleteItemReload] = useAjax();
  const [updatedItem, updateItemReload] = useAjax();

  const addItem = (item) => {
    item.due = new Date();
    addItemReload(todoAPI, 'post', JSON.stringify(item));
  };

  const updateItem = (id, text) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.text = text;

      let url = `${todoAPI}/${id}`;

      updateItemReload(url, 'put', JSON.stringify(item));
    }
  };

  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;
      updateItemReload(url, 'put', JSON.stringify(item));
    }
  };

  const deleteItem = (id) => {
    let url = `${todoAPI}/${id}`;
    deleteItemReload(url, 'delete');
  };

  // update list on update item
  useEffect(() => {
    setList((list) => {
      if (updatedItem && updatedItem.data) {
        return list.map((listItem) =>
          listItem._id === updatedItem.data._id ? updatedItem.data : listItem
        );
      } else {
        return list;
      }
    });
  }, [updatedItem]);

  // update list on delete an item
  useEffect(() => {
    setList((list) => {
      if (deletedItem && deletedItem.data)
        return list.filter((listItem) => listItem._id !== deletedItem.data._id);
      else return list;
    });
  }, [deletedItem]);

  // update list on add item
  useEffect(() => {
    setList((list) => {
      if (addedItem && addedItem.data) return [...list, addedItem.data];
      else return list;
    });
  }, [addedItem]);

  // update list on first open the page
  useEffect(() => {
    setList(() => {
      if (results) return results.data.results;
      else return [];
    });
  }, [results]);

  // update the document title
  useEffect(() => {
    const completedTasks = list.filter((item) => item.complete).length;
    document.title = `To Do List ${completedTasks}/${list.length}`;
  }, [list]);

  return (
    <Container fluid={true}>
      <Container fluid={false}>
        <CheckAuth permission='read'>
          <Row className='bg-dark my-4'>
            <MainHeader list={list} />
          </Row>
        </CheckAuth>
        <Row>
          <CheckAuth permission='create'>
            <Col className='col-4'>
              <TodoForm handleSubmit={addItem} />
            </Col>
          </CheckAuth>
          <CheckAuth permission='read'>
            <Col className='col-8'>
              {!results ? (
                <Spinner animation='border' />
              ) : (
                <TodoList
                  list={list}
                  handleDelete={deleteItem}
                  handleComplete={toggleComplete}
                  handleUpdate={updateItem}
                />
              )}
            </Col>
          </CheckAuth>
        </Row>
      </Container>
    </Container>
  );
};

export default LoggedIn(HomePage);
