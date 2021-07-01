import React, { useContext } from 'react';
import { isAuth } from '../CheckAuth/CheckAuth';
import { authContext } from '../../context/auth/context';
import BootstrapCard from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from '../Modal/Modal';
import CheckAuth from '../CheckAuth/CheckAuth';

const Card = (props) => {
  const { user } = useContext(authContext);

  return (
    <BootstrapCard className='shadow mb-4'>
      <BootstrapCard.Header>
        <Badge
          onClick={() =>
            isAuth(user, 'update') ? props.handleComplete(props.item._id) : null
          }
          pill
          className={`${isAuth(user, 'update') && 'btn'} text-light bg-${
            props.item.complete ? 'success' : 'danger'
          }`}
        >
          {props.item.complete ? 'Completed' : 'Pending'}
        </Badge>
        <span className='ml-4'>{props.item.assignee}</span>
        <CheckAuth permission='delete'>
          <CloseButton onClick={() => props.handleDelete(props.item._id)} />
        </CheckAuth>
        <Modal item={props.item} handleUpdate={props.handleUpdate} />
      </BootstrapCard.Header>
      <BootstrapCard.Body>
        <BootstrapCard.Text>{props.item.text}</BootstrapCard.Text>
      </BootstrapCard.Body>
      <BootstrapCard.Footer>
        <BootstrapCard.Text className='text-right'>
          difficulty: {props.item.difficulty}
        </BootstrapCard.Text>
      </BootstrapCard.Footer>
    </BootstrapCard>
  );
};

export default Card;
