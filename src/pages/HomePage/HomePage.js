import React, { useState, useEffect } from 'react';
import TodoForm from '../../components/Form/Form.js';
import TodoList from '../../components/List/List.js';
import Header from '../../components/Header/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './HomePage.scss';
import MainHeader from '../../components/MainHeader/MainHeader.js';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const HomePage = (props) => {
  const [list, setList] = useState([]);
  
  
  const addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((savedItem) => {
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };

  const updateItem = (id, text) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.text = text;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((savedItem) => {
          setList(
            list.map((listItem) =>
              listItem._id === item._id ? savedItem : listItem
            )
          );
        })
        .catch(console.error);
    }
  };

  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((savedItem) => {
          setList(
            list.map((listItem) =>
              listItem._id === item._id ? savedItem : listItem
            )
          );
        })
        .catch(console.error);
    }
  };

  const deleteItem = (id) => {

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'delete',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((deletedItem) => {
          setList(
            list.filter(listItem => listItem._id !== deletedItem._id )
          );
        })
        .catch(console.error);
  };


  const getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then((data) => data.json())
      .then((data) => setList(data.results))
      .catch(console.error);
  };

  useEffect(getTodoItems, []);

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
            <TodoList
              list={list}
              handleDelete={deleteItem}
              handleComplete={toggleComplete}
              handleUpdate={updateItem}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
