import React from 'react';
import BootstrapCard from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from '../Modal/Modal';

const Card = (props) => {
  return (
    <BootstrapCard className='shadow mb-4'>
      <BootstrapCard.Header>
        <Badge
          onClick={() => props.handleComplete(props.item._id)}
          pill
          className={`btn text-light bg-${
            props.item.complete ? 'danger' : 'success'
          }`}
        >
          {props.item.complete ? 'Pending' : 'Completed'}
        </Badge>
        <span className='ml-4'>{props.item.assignee}</span>
        <CloseButton onClick={() => props.handleDelete(props.item._id)} />
        <Modal item={props.item} />
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
