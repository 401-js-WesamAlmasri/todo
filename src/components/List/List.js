import React, { useState, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import Card from '../Card/Card';
import { settingContext } from '../../context/settings/context';

const TodoList = (props) => {
  const settingState = useContext(settingContext);

  const [page, setPage] = useState(1);

  
  const start = (page - 1) * settingState.pageSize;
  const end = start + settingState.pageSize;
  
  let list = props.list
    .filter(item => settingState.hideCompleteItem ? !item.complete : true )

  const numberOfPages = Math.ceil(list.length / settingState.pageSize);

  list = list
    .sort((a, b) => b[settingState.sortField] - a[settingState.sortField])
    .slice(start, end);

  const paginationItems = [];

  for (let p = 1; p <= numberOfPages; p++) {
    paginationItems.push(
      <Pagination.Item onClick={() => setPage(p)} key={p} active={p === page}>
        {p}
      </Pagination.Item>
    );
  }
  
  return (
    <>
      <ListGroup className='ml-4'>
        {list
          .map((item) => (
            <Card
              key={item._id}
              item={item}
              handleComplete={props.handleComplete}
              handleDelete={props.handleDelete}
              handleUpdate={props.handleUpdate}
            />
          ))}
      </ListGroup>
      <div>
        <Pagination >
          <Pagination.First onClick={() => setPage(1)} disabled={1 === page} />
          <Pagination.Prev onClick={() => setPage(p => p - 1)} disabled={1 === page}/>
          {paginationItems}
          <Pagination.Next onClick={() => setPage(p => p + 1)} disabled={numberOfPages === page} />
          <Pagination.Last onClick={() => setPage(numberOfPages)} disabled={numberOfPages === page} />
        </Pagination>
      </div>
    </>
  );
};

export default TodoList;
