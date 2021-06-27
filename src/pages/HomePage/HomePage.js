import React, { useState, useEffect } from 'react';
import TodoForm from '../../components/Form/Form.js';
import TodoList from '../../components/List/List.js';
import Header from '../../components/Header/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './HomePage.scss';
import MainHeader from '../../components/MainHeader/MainHeader.js';

const HomePage = (props) => {
  const [list, setList] = useState([]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let updatedList = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      setList(updatedList);
    }
  };

  const deleteItem = (id) => {
    console.log('ID : ', id);
      let updatedList = list.filter((listItem) => listItem._id !== id);
      setList(updatedList);
  };

  useEffect(() => {
    let list = [
      {
        _id: 1,
        complete: false,
        text: 'Clean the Kitchen',
        difficulty: 3,
        assignee: 'Person A',
      },
      {
        _id: 2,
        complete: false,
        text: 'Do the Laundry',
        difficulty: 2,
        assignee: 'Person A',
      },
      {
        _id: 3,
        complete: false,
        text: 'Walk the Dog',
        difficulty: 4,
        assignee: 'Person B',
      },
      {
        _id: 4,
        complete: true,
        text: 'Do Homework',
        difficulty: 3,
        assignee: 'Person C',
      },
      {
        _id: 5,
        complete: false,
        text: 'Take a Nap',
        difficulty: 1,
        assignee: 'Person B',
      },
    ];

    setList(list);
  }, []);

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
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
