import React, { useState, useEffect } from 'react';
import TodoForm from '../../components/Form/Form.js';
import TodoList from '../../components/List/List.js';
import Header from '../../components/Header/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useAjax from '../../hooks/useAjax';
import Spinner from 'react-bootstrap/Spinner';

import './HomePage.scss';
import MainHeader from '../../components/MainHeader/MainHeader.js';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const HomePage = (props) => {
  const [list, setList] = useState([]);
  const [results, loading, reload] = useAjax(todoAPI, 'get', null);
  const [addedItem, addItemLoading, addItemReload] = useAjax();
  const [deletedItem, deleteItemLoading, deleteItemReload] = useAjax();
  const [updatedItem, updateItemLoading, updateItemReload] = useAjax();

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
    if (!updateItemLoading && updatedItem) {
      setList(
        list.map((listItem) =>
          listItem._id === updatedItem.data._id ? updatedItem.data : listItem
        )
      );
    }
  }, [updateItemLoading]);

  // update list on delete an item
  useEffect(() => {
    if (!deleteItemLoading && deletedItem)
      setList(list.filter((listItem) => listItem._id !== deletedItem.data._id));
  }, [deleteItemLoading]);

  // update list on add item
  useEffect(() => {
    if (!addItemLoading && addedItem) setList([...list, addedItem.data]);
  }, [addItemLoading]);

  // update list on first open the page
  useEffect(() => {
    if (!loading) if (results.data.results) setList(results.data.results);
  }, [loading]);

  // update the document title
  useEffect(() => {
    const completedTasks = list.filter((item) => item.complete).length;
    document.title = `To Do List ${completedTasks}/${list.length}`;
  }, [list]);

  return (
    <Container fluid={true}>
      <Header list={list} />
      <Container fluid={false}>
        <Row className='bg-dark my-4'>
          <MainHeader list={list} />
        </Row>
        <Row>
          <Col className='col-4'>
            <TodoForm handleSubmit={addItem} />
          </Col>

          <Col className='col-8'>
            {false ? (
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
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
